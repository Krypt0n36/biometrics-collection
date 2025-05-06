

Biometeric Collector JavaScript:
--------------------------------

This script designed to collect metadata about user's interactions with a web page. It only collects general behavioral metrics with no privacy intrusion. It is designed
to be easily intergrated into web site's pages, simply by wrapping the script inside a script tag in the HTML source code.

Our Mission:
------------

Understand human behavior web navigation patterns to train an AI model that distinguishes between human and robots. This is persued with the objective to help companies
and website owners circumvent malicious bot activies.

Data collected:
---------------

The data collected is in the following structure:
```json
{
 "kslkmcslkdmc": [
            {
              "action": "click",
              "x": 1147,
              "y": 200,
              "timestamp": 1746534843878,
              "target": {
                "tag": "UL",
                "type": "",
                "width": 1673,
                "height": 34,
                "position": [
                  208,
                  172.9375
                ]
              },
              "window_size": {
                "width": 1920,
                "height": 967
              }
            },
            {
              "action": "mouse_move",
              "timestamp": 1746534844079,
              "x": 1146,
              "y": 200,
              "window_size": {
                "width": 1920,
                "height": 967
              }
            },
            {
              "action": "scroll",
              "timestamp": 1746534792080,
              "current_offset": 2,
              "total_offset": 7414,
              "scroll_direction": "n/a",
              "window_size": {
                "width": 1920,
                "height": 967
              }
            },
            {
              "action": "keypress",
              "timestamp": 1746534908773,
              "window_size": {
                "width": 1920,
                "height": 967
              }
            },
      ]
}
```
Metrics are collected and clustered in sessions with randomly generated sessionIDs, meaning that there is no appropriate solution to link/corelate two distinct sessions neither to attribute them to a specific user.

* **Clicks**: Where user clicked (coordinates, timestamp, element_type: button, textbox..)
* **Move**: Mouse movement (coordinated, timestamp)
* **Scroll**: Scrollbar movement (Scroll offset, page offset, direction)
* **Keypress**: Key press (timestamp only, no specific key data is taken)

Fingerprint:
------------
We have provided two alternative scripts:
1. **collector.js:** User biometrics + browser fingerprinting.
2. **collector_minimal.js**: User biometrics only.

Fingerprinting collects general device information that might be used in the future in the classification process because it gives valuable information about device authenticity.

Fingerprint example:
```json
{"userAgent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36","language":"en-US","languages":"en-US,en","platform":"Linux x86_64","cookieEnabled":true,"timezone":"Europe/Berlin","timezoneOffset":{"$numberInt":"-120"},"screenWidth":{"$numberInt":"1920"},"screenHeight":{"$numberInt":"1080"},"screenDepth":{"$numberInt":"24"},"screenAvailWidth":{"$numberInt":"1920"},"screenAvailHeight":{"$numberInt":"1002"},"screenDevicePixelRatio":{"$numberInt":"1"},"hardwareConcurrency":{"$numberInt":"4"},"deviceMemory":{"$numberInt":"8"},"connectionEffectiveType":"4g","connectionDownlink":{"$numberInt":"10"},"connectionRtt":{"$numberInt":"50"},"connectionSaveData":false,"plugins":[{"name":"PDF Viewer","description":"Portable Document Format","filename":"internal-pdf-viewer"},{"name":"Chrome PDF Viewer","description":"Portable Document Format","filename":"internal-pdf-viewer"},{"name":"Chromium PDF Viewer","description":"Portable Document Format","filename":"internal-pdf-viewer"},{"name":"Microsoft Edge PDF Viewer","description":"Portable Document Format","filename":"internal-pdf-viewer"},{"name":"WebKit built-in PDF","description":"Portable Document Format","filename":"internal-pdf-viewer"}],"features":{"localStorage":true,"sessionStorage":true,"indexedDB":true,"addBehavior":false,"openDatabase":false,"webdriver":false,"touch":false,"maxTouchPoints":{"$numberInt":"0"},"webGl":true,"webRtc":true,"geolocation":true,"speechSynthesis":true,"bluetooth":false,"credentials":true,"permissions":true,"serviceWorker":true,"visual":true,"presentation":true,"devtools":true},"canvasHash":"gem1mc","webgl":{"vendor":"WebKit","renderer":"WebKit WebGL","vendorUnmasked":"Google Inc. (Intel)","rendererUnmasked":"ANGLE (Intel, Mesa Intel(R) HD Graphics 530 (SKL GT2), OpenGL 4.6)","extensions":["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_clip_control","EXT_color_buffer_half_float","EXT_depth_clamp","EXT_disjoint_timer_query","EXT_float_blend","EXT_frag_depth","EXT_polygon_offset_clamp","EXT_shader_texture_lod","EXT_texture_compression_bptc","EXT_texture_compression_rgtc","EXT_texture_filter_anisotropic","EXT_texture_mirror_clamp_to_edge","EXT_sRGB","KHR_parallel_shader_compile","OES_element_index_uint","OES_fbo_render_mipmap","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_blend_func_extended","WEBGL_color_buffer_float","WEBGL_compressed_texture_astc","WEBGL_compressed_texture_etc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_debug_renderer_info","WEBGL_debug_shaders","WEBGL_depth_texture","WEBGL_draw_buffers","WEBGL_lose_context","WEBGL_multi_draw","WEBGL_polygon_mode"],"parameters":{"aliasedLineWidthRange":{"0":{"$numberInt":"1"},"1":{"$numberDouble":"7.375"}},"aliasedPointSizeRange":{"0":{"$numberInt":"1"},"1":{"$numberInt":"255"}},"maxViewportDims":{"0":{"$numberInt":"16384"},"1":{"$numberInt":"16384"}},"maxTextureSize":{"$numberInt":"16384"},"maxRenderbufferSize":{"$numberInt":"16384"},"maxCombinedTextureImageUnits":{"$numberInt":"64"},"maxCubeMapTextureSize":{"$numberInt":"16384"},"maxFragmentUniformVectors":{"$numberInt":"1024"},"maxTextureImageUnits":{"$numberInt":"32"},"maxVertexAttribs":{"$numberInt":"16"},"maxVertexTextureImageUnits":{"$numberInt":"32"},"maxVertexUniformVectors":{"$numberInt":"1024"}}},"webglImageHash":"rlbef2","audioHash":{"$numberInt":"0"},"error":"Error collecting fingerprint: detected.push is not a function"}
```


 


