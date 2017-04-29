# Single operations

K[zoom on one node](zoomOn('node1'))

K[zoom on two nodes](zoomOn(['node1','node2']))

K[highlight on](highlightOn('node1', 'red'))

K[highlight off](highlightOff('node1'))

K[toggle highlight](toggleHighlight('node1', 'red'))

K[show](show('node1'))

K[hide](hide('node1'))

K[toggle hidden](toggleHidden('node1'))

K[pan to one node](panTo('node1'))

K[pan to two nodes](panTo(['node1','node2']))

# Multiple operations

K[zoom on two nodes and highlight off](zoomOn(['node1','node2']) highlightOff('node1'))

K[zoom on and highlight on](zoomOn('node1') highlightOn('node1', 'red'))

K[show and highlight](show('node1') highlightOn('node1', 'red'))

# Double up
K[double hide](hide('node1') hide('node2'))

# Test general

K[pan on one](panTo('node1')) and some text in between K[highlight](highlightOn('node1', 'red')).

# Shouldn't work
[no namespace](show('node1'))

K[use double quotes](show("node1"))
