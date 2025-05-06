
let session_id = generateSessionId();
let collection = [];
let host_address = await getHostAddress();	

async function getHostAddress(){
	const resp = await fetch("https://raw.githubusercontent.com/Krypt0n36/global-store/refs/heads/main/host", {
		method: 'GET'
	})
	
	if(resp.ok){
		const host = await resp.text();
		return host;
	}else{
		return null;
	}
}


function storeInteraction(intr){
	collection.push(intr)
}

function generateSessionId(){
	return Math.random().toString(36).substr(2, 9);
}


async function sendCollection(){

	const window_size = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    // Local copy to avoid race conditions
    const collection_copy = [...collection];

    if (collection_copy.length > 10){
    	const resp = await fetch(host_address + '/api/interaction', {
			method: 'POST',
			headers:{
				"Content-Type":"application/json",
			},
			body: JSON.stringify({
				collection:collection_copy,
				window_size: window_size,
			})
		})

		if(resp.ok){
			// Throw sent elements
			collection = collection.slice(collection_copy.length, collection.length)
			console.log(`Sent items ${collection_copy.length}`)
			console.log(`Remained items ${collection.length}`)
		}else{
			console.error("sendCollection() failed.")
		}			
    }else{
    	console.log("Waiting")
    }
}


// Function to get element details
function getElementDetails(element) {
    const rect = element.getBoundingClientRect();
    return {
        tag: element.tagName,
        type: element.type || '',
        width: rect.width,
        height: rect.height,
        position: [rect.left, rect.top]
    };
}

// Listen to user interactions

// Track mouse movements
document.addEventListener('mousemove', (e) => {
    storeInteraction({
            action: 'mouse_move',
            timestamp: Date.now(),
            x: e.clientX,
            y: e.clientY,
            session_id: session_id,
        });
})

let lastScrollY = null;
// Track scroll events
document.addEventListener('scroll', () => {
        // Get current scroll position
        const currentScrollY = window.scrollY || window.pageYOffset;
        // Get total scrollable height and width
        const totalHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        ) - window.innerHeight;

        // Get scroll direction
        const scrollDirection = lastScrollY === null ? 'n/a' : currentScrollY > lastScrollY ? 'down' : 'up';

        // Update last scroll position
        lastScrollY = currentScrollY;

        storeInteraction({
                action: 'scroll',
                timestamp: Date.now(),
                session_id: session_id,
                current_offset: currentScrollY,
                total_offset: totalHeight,
                scroll_direction: scrollDirection,
 		});
})


// Track clicks
document.addEventListener('click', (e) => {
        storeInteraction({
            action: 'click',
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now(),
            session_id: session_id,
            target: getElementDetails(e.target),
 		});
})

// Track keypresses
document.addEventListener('keypress', (e) => {
        storeInteraction({
            action: 'keypress',
            timestamp: Date.now(),
            session_id: session_id,
 		});
})

// Handle visibility change (tab switch)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Generate new session ID when tab becomes visible
        session_id = generateSessionId();
    }
});



// Main
setInterval(sendCollection, 1000);
