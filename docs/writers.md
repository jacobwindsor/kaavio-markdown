# Writers
Kaavio Showdown allows you to create interactive descriptions that accompany a Kaavio diagram. These descriptions 
contain interactive links that, when clicked, change the visualisation of the diagram. For example, you can highlight and zoom in on
diagram elements. A demo of the kind of descriptions you can achieve is available 
[here](https://jacobwindsor.github.io/jcbwndsr/interactive-descriptions.html).

## Standard Markdown syntax
Before starting you should be familiar with Markdown. It is a text-to-html conversion tool for the web that allows you 
to write in an easy-to-understand plain text format. This means you can easily create headings, lists, tables, inline images etc.

Learn the Markdown syntax [here](https://daringfireball.net/projects/markdown/syntax).

## Basic syntax
The syntax for all interactive description links is the same across operations. More information on the operations
you can perform is available further down below.

**Important**: Each link is *self describing*. This means that the diagram will be reset *before* performing the
operations you specify. 

```markdown
K[some text](operation(params))
```

This would render a link that looks like this: [some text]().

**Note**: Don't forget the `K` namespace!

### Multiple operations
You may add multiple operations in one link like so:
```markdown
K[some text](operation1(params) operation2(params))
```

## Operations
Each operation is written is a JavaScript like style. Those with development experience should be comfortable with this.
### highlightOn
```javascript
highlightOn(entity_id: string, color: string)
```

e.g.:
```javascript
highlightOn('abc', 'red')

### hide
```javascript
hide(entity_id: string)
```

### zoomOn
You may zoom on a single entity or a group of entities (in an array). The diagram will be zoomed in so that the selected
entities fill up as much space as possible. The diagram is also panned to the center of the selected entities.
```javascript
zoomOn(entity_id(s): string | string[])
```

e.g.:
```javascript
zoomOn('abc')

// or
zoomOn(['abc', '123'])
```
  
### panTo
As with zoomOn, you may pan to a single entity or a group of entities (in an array).
```javascript
panTo(entity_id(s): string | string[])
```

## Examples
The below example will create a link that highlights `node1` red, zoom onto `node2` and hide `node3`:

```markdown
K[do some stuff](highlightOn('node1', 'red') zoomOn('node2') hide('node3'))
```
