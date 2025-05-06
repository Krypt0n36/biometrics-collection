

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


