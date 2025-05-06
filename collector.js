
let session_id = generateSessionId();
let collection = [];
let host_address = await getHostAddress();	

async function getHostAddress(){
	const resp = await fetch("https://raw.githubusercontent.com/Krypt0n36/global-store/refs/heads/main/host", {
		method: 'GET'
	})
	
	if(resp.ok){
		const host = await resp.text();
		console.log("Host address: " + host)
		sendFingerprint(host);
		return host;
	}else{
		return null;
	}
}

/**
* Comprehensive browser fingerprinting function
* Returns an object containing various browser attributes that can be used for fingerprinting
*/
function fingerprint(){
	function collectBrowserFingerprint() {
	  const fingerprint = {};

	  try {
	    // Basic browser information
	    fingerprint.userAgent = navigator.userAgent;
	    fingerprint.language = navigator.language;
	    fingerprint.languages = Array.isArray(navigator.languages) ? navigator.languages.join(',') : null;
	    fingerprint.platform = navigator.platform;
	    fingerprint.doNotTrack = navigator.doNotTrack || window.doNotTrack;
	    fingerprint.cookieEnabled = navigator.cookieEnabled;
	    fingerprint.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	    fingerprint.timezoneOffset = new Date().getTimezoneOffset();

	    // Screen properties
	    if (window.screen) {
	      fingerprint.screenWidth = window.screen.width;
	      fingerprint.screenHeight = window.screen.height;
	      fingerprint.screenDepth = window.screen.colorDepth;
	      fingerprint.screenAvailWidth = window.screen.availWidth;
	      fingerprint.screenAvailHeight = window.screen.availHeight;
	      fingerprint.screenDevicePixelRatio = window.devicePixelRatio;
	    }

	    // Hardware information
	    fingerprint.hardwareConcurrency = navigator.hardwareConcurrency;
	    fingerprint.deviceMemory = navigator.deviceMemory;

	    // Battery status
	    if (navigator.getBattery) {
	      navigator.getBattery().then(battery => {
	        fingerprint.batteryLevel = battery.level;
	        fingerprint.batteryCharging = battery.charging;
	        fingerprint.batteryChargingTime = battery.chargingTime;
	        fingerprint.batteryDischargingTime = battery.dischargingTime;
	      }).catch(err => {
	        fingerprint.batteryError = `Battery API error: ${err.message}`;
	      });
	    }

	    // Network information
	    if (navigator.connection) {
	      fingerprint.connectionType = navigator.connection.type;
	      fingerprint.connectionEffectiveType = navigator.connection.effectiveType;
	      fingerprint.connectionDownlink = navigator.connection.downlink;
	      fingerprint.connectionRtt = navigator.connection.rtt;
	      fingerprint.connectionSaveData = navigator.connection.saveData;
	    }

	    // Media devices information (count of devices only for privacy)
	    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
	      navigator.mediaDevices.enumerateDevices().then(devices => {
	        fingerprint.audioInputs = devices.filter(d => d.kind === 'audioinput').length;
	        fingerprint.audioOutputs = devices.filter(d => d.kind === 'audiooutput').length;
	        fingerprint.videoInputs = devices.filter(d => d.kind === 'videoinput').length;
	      }).catch(err => {
	        fingerprint.mediaDevicesError = `Media Devices API error: ${err.message}`;
	      });
	    }

	    // Browser plugins
	    fingerprint.plugins = [];
	    if (navigator.plugins) {
	      for (let i = 0; i < navigator.plugins.length; i++) {
	        const plugin = navigator.plugins[i];
	        const pluginInfo = {
	          name: plugin.name,
	          description: plugin.description,
	          filename: plugin.filename
	        };
	        fingerprint.plugins.push(pluginInfo);
	      }
	    }

	    // Browser features detection
	    fingerprint.features = {
	      localStorage: !!window.localStorage,
	      sessionStorage: !!window.sessionStorage,
	      indexedDB: !!window.indexedDB,
	      addBehavior: !!document.body?.addBehavior,
	      openDatabase: !!window.openDatabase,
	      cpuClass: navigator.cpuClass,
	      webdriver: navigator.webdriver,
	      touch: 'ontouchstart' in window,
	      maxTouchPoints: navigator.maxTouchPoints || 0,
	      webGl: !!window.WebGLRenderingContext,
	      webRtc: !!window.RTCPeerConnection,
	      geolocation: !!navigator.geolocation,
	      speechSynthesis: !!window.speechSynthesis,
	      bluetooth: !!navigator.bluetooth,
	      credentials: !!navigator.credentials,
	      permissions: !!navigator.permissions,
	      serviceWorker: !!navigator.serviceWorker,
	      visual: !!window.visualViewport,
	      presentation: !!navigator.presentation,
	      devtools: isDevToolsOpen()
	    };

	    // Check for AdBlock (simplified method)
	    checkAdBlocker().then(result => {
	      fingerprint.adBlockerActive = result;
	    });

	    // Canvas fingerprinting
	    try {
	      const canvas = document.createElement('canvas');
	      canvas.width = 200;
	      canvas.height = 50;
	      const ctx = canvas.getContext('2d');
	      ctx.textBaseline = 'top';
	      ctx.font = '14px Arial';
	      ctx.fillStyle = '#f60';
	      ctx.fillRect(10, 10, 100, 30);
	      ctx.fillStyle = '#069';
	      ctx.fillText('Fingerprint', 15, 15);
	      fingerprint.canvasHash = hashCode(canvas.toDataURL());
	    } catch (e) {
	      fingerprint.canvasError = `Canvas error: ${e.message}`;
	    }

	    // WebGL fingerprinting
	    try {
	      const canvas = document.createElement('canvas');
	      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	      
	      if (gl) {
	        fingerprint.webgl = {
	          vendor: gl.getParameter(gl.VENDOR),
	          renderer: gl.getParameter(gl.RENDERER),
	          vendorUnmasked: getUnmaskedInfo(gl).vendor,
	          rendererUnmasked: getUnmaskedInfo(gl).renderer,
	          extensions: gl.getSupportedExtensions(),
	          parameters: {
	            aliasedLineWidthRange: gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
	            aliasedPointSizeRange: gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE),
	            maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
	            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
	            maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
	            maxCombinedTextureImageUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
	            maxCubeMapTextureSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
	            maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
	            maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
	            maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
	            maxVertexTextureImageUnits: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
	            maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
	          }
	        };
	        
	        // Create a unique WebGL identifier based on specific rendering
	        const webglCanvas = document.createElement('canvas');
	        webglCanvas.width = 50;
	        webglCanvas.height = 50;
	        const webglContext = webglCanvas.getContext('webgl');
	        
	        if (webglContext) {
	          const vertexPosBuffer = webglContext.createBuffer();
	          webglContext.bindBuffer(webglContext.ARRAY_BUFFER, vertexPosBuffer);
	          const vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]);
	          webglContext.bufferData(webglContext.ARRAY_BUFFER, vertices, webglContext.STATIC_DRAW);
	          
	          const program = createShaderProgram(webglContext);
	          webglContext.useProgram(program);
	          
	          const vertexPosAttrib = webglContext.getAttribLocation(program, 'attrVertex');
	          webglContext.enableVertexAttribArray(vertexPosAttrib);
	          webglContext.vertexAttribPointer(vertexPosAttrib, 3, webglContext.FLOAT, false, 0, 0);
	          
	          webglContext.clearColor(0, 0, 0, 1);
	          webglContext.clear(webglContext.COLOR_BUFFER_BIT);
	          webglContext.drawArrays(webglContext.TRIANGLES, 0, 3);
	          
	          fingerprint.webglImageHash = hashCode(webglCanvas.toDataURL());
	        }
	      }
	    } catch (e) {
	      fingerprint.webglError = `WebGL error: ${e.message}`;
	    }

	    // Audio fingerprinting
	    try {
	      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	      const analyser = audioContext.createAnalyser();
	      const oscillator = audioContext.createOscillator();
	      const dynamicsCompressor = audioContext.createDynamicsCompressor();
	      
	      // Configure audio nodes
	      oscillator.type = 'triangle';
	      oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);
	      
	      // Values to create unique audio signature
	      dynamicsCompressor.threshold.setValueAtTime(-50, audioContext.currentTime);
	      dynamicsCompressor.knee.setValueAtTime(40, audioContext.currentTime);
	      dynamicsCompressor.ratio.setValueAtTime(12, audioContext.currentTime);
	      dynamicsCompressor.attack.setValueAtTime(0, audioContext.currentTime);
	      dynamicsCompressor.release.setValueAtTime(0.25, audioContext.currentTime);
	      
	      oscillator.connect(dynamicsCompressor);
	      dynamicsCompressor.connect(analyser);
	      analyser.connect(audioContext.destination);
	      
	      oscillator.start(0);
	      
	      // Create the audio fingerprint
	      const dataArray = new Uint8Array(analyser.frequencyBinCount);
	      analyser.getByteFrequencyData(dataArray);
	      
	      // Extract a signature from the audio data
	      let audioSignature = '';
	      for (let i = 0; i < dataArray.length; i += 100) {
	        if (dataArray[i]) {
	          audioSignature += dataArray[i];
	        }
	      }
	      
	      fingerprint.audioHash = hashCode(audioSignature);
	      
	      // Clean up
	      oscillator.stop(1);
	      audioContext.close();
	    } catch (e) {
	      fingerprint.audioError = `Audio fingerprinting error: ${e.message}`;
	    }

	    // Font detection
	    fingerprint.fonts = detectFonts();

	    // Additional browser headers - note that these are usually not accessible via JavaScript
	    // and would typically be collected server-side
	    fingerprint.referrer = document.referrer;
	    fingerprint.acceptLanguage = navigator.languages ? navigator.languages.join(',') : navigator.language;

	  } catch (err) {
	    fingerprint.error = `Error collecting fingerprint: ${err.message}`;
	  }

	  return fingerprint;
	}

	// Helper Functions

	// Create WebGL shader program
	function createShaderProgram(gl) {
	  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	  gl.shaderSource(vertexShader, `
	    attribute vec2 attrVertex;
	    varying vec2 varyinTexCoordinate;
	    uniform vec2 uniformOffset;
	    void main() {
	      varyinTexCoordinate = attrVertex + uniformOffset;
	      gl.Position = vec4(attrVertex, 0, 1);
	    }
	  `);
	  gl.compileShader(vertexShader);

	  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	  gl.shaderSource(fragmentShader, `
	    precision mediump float;
	    varying vec2 varyinTexCoordinate;
	    void main() {
	      gl.FragColor = vec4(varyinTexCoordinate, 0, 1);
	    }
	  `);
	  gl.compileShader(fragmentShader);

	  const program = gl.createProgram();
	  gl.attachShader(program, vertexShader);
	  gl.attachShader(program, fragmentShader);
	  gl.linkProgram(program);

	  return program;
	}

	// Get unmasked WebGL info
	function getUnmaskedInfo(gl) {
	  const unmaskedInfo = {
	    vendor: '',
	    renderer: ''
	  };
	  
	  const dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info');
	  if (dbgRenderInfo) {
	    unmaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
	    unmaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
	  }
	  
	  return unmaskedInfo;
	}

	// Simple hash function for strings
	function hashCode(str) {
	  let hash = 0;
	  if (str.length === 0) return hash;
	  
	  for (let i = 0; i < str.length; i++) {
	    const char = str.charCodeAt(i);
	    hash = ((hash << 5) - hash) + char;
	    hash = hash & hash; // Convert to 32bit integer
	  }
	  
	  return hash.toString(36);
	}

	// Check if DevTools is open
	function isDevToolsOpen() {
	  const widthThreshold = window.outerWidth - window.innerWidth > 160;
	  const heightThreshold = window.outerHeight - window.innerHeight > 160;
	  return widthThreshold || heightThreshold;
	}

	// Check for ad blocker
	function checkAdBlocker() {
	  return new Promise(resolve => {
	    const testElement = document.createElement('div');
	    testElement.innerHTML = '&nbsp;';
	    testElement.className = 'adsbox';
	    testElement.style = 'position: absolute; left: -999px;';
	    document.body.appendChild(testElement);
	    
	    setTimeout(() => {
	      if (testElement.offsetHeight === 0) {
	        resolve(true); // Ad blocker detected
	      } else {
	        resolve(false); // No ad blocker
	      }
	      testElement.remove();
	    }, 100);
	  });
	}

	// Detect available fonts
	function detectFonts() {
	  const baseFonts = ['monospace', 'sans-serif', 'serif'];
	  const fontList = [
	    'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Bookman Old Style',
	    'Bradley Hand', 'Century', 'Century Gothic', 'Comic Sans MS', 'Courier',
	    'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console',
	    'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Unicode', 'MS Gothic',
	    'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif',
	    'MS Serif', 'MYRIAD', 'MYRIAD PRO', 'Palatino Linotype', 'Segoe Print',
	    'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold',
	    'Tahoma', 'Times', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Wingdings'
	  ];
	  
	  const testString = 'mmmmmmmmmmlli';
	  const testSize = '72px';
	  const h = document.getElementsByTagName('body')[0];
	  const d = document.createElement('div');
	  d.style.cssText = 'position: absolute; left: -9999px; visibility: hidden;';
	  h.appendChild(d);
	  
	  const defaultWidth = {};
	  const defaultHeight = {};
	  
	  for (let index = 0; index < baseFonts.length; index++) {
	    d.style.fontFamily = baseFonts[index];
	    d.innerHTML = testString;
	    defaultWidth[baseFonts[index]] = d.offsetWidth;
	    defaultHeight[baseFonts[index]] = d.offsetHeight;
	  }
	  
	  const detected = [];
	  for (let i = 0; i < fontList.length; i++) {
	    let detected = false;
	    for (let j = 0; j < baseFonts.length; j++) {
	      d.style.fontFamily = fontList[i] + ',' + baseFonts[j];
	      d.innerHTML = testString;
	      
	      if ((d.offsetWidth !== defaultWidth[baseFonts[j]]) || (d.offsetHeight !== defaultHeight[baseFonts[j]])) {
	        detected = true;
	      }
	    }
	    
	    if (detected) {
	      detected.push(fontList[i]);
	    }
	  }
	  
	  h.removeChild(d);
	  return detected;
	}

	return collectBrowserFingerprint();
}


function storeInteraction(intr){
	collection.push(intr)
}

function generateSessionId(){
	return Math.random().toString(36).substr(2, 9);
}

function sendFingerprint(host){

	const resp = fetch(host + '/api/fingerprint', {
		method: 'POST',
		headers:{
			"Content-Type":"application/json",
		},
		body: JSON.stringify({
			fingerprint: fingerprint()
		})
	})
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
