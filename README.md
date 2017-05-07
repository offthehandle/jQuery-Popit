### Quick links
- [jQuery Popit](#jquery-popit)
- [Installation](#installation)
    - [Install with NuGet](#install-with-nuget)
- [Options](#options)
    - [Dimensions](#dimensions)
    - [Attributes](#attributes)
        - [Link Example](#link-example)
    - [Media Processing](#media-processing)
        - [Process Params](#process-params)
        - [Wait To Process](#wait-to-process)

# jQuery Popit

Popit is a simple jQuery plugin designed to enhance HTML links with attribute affordances that mitigate JS popup blockers. It has additional options designed specifically for audio/visual media.

## Installation
Installation is easy and requires no configuration. The only dependency is jQuery 1.9.1 or later. The default configuration creates popups at the dimensions of 960px wide by 285px high. See below for a basic configuration.

```javascript
$(document).ready(function () {
  $('.safe-popup').popit();
});
```

##### Install with NuGet
To install Popit, run the following command in the Package Manager Console:

```
PM> Install-Package jQuery.Popit
```

## Options
See below for the complete configuration with default settings.

```javascript
  popup: $(this),
  defaultWidth: 960,
  defaultHeight: 285,
  url: $(this).attr('href'),
  name: $(this).attr('target'),
  dynamicWidth: $(this).data('width'),
  dynamicHeight: $(this).data('height'),
  processParams: false,
  waitToProcess: 500
```

### Dimensions
The `defaultWidth`, `defaultHeight`, `dynamicWidth` and `dynamicHeight` options set the dimensions of the popup window. The default options set hard-coded values assigned at document ready. The dynamic options use HTML5 data attributes on discrete popit links and, when set, override the default values.

### Attributes
The `url` and `name` define the attributes from where the name of the popup window and its contents will be gotten. The defaults hook into standard HTML conventions, which is recommended for maximum popup blocker mitigation.

##### Link Example

###### HTML
```html
<a class="safe-popup" href="/audio/top-40-playlist.html" target="_blank" data-width="640">My link</a>
```

###### Popit Options
```javascript
$(document).ready(function () {
  $('.safe-popup').popit({
    defaultWidth: 320
  });
});
```

A custom default width is set to 320px, but a dynamic width on the link is set to 640px that will override the default setting. The height will be 285px according to the plugin defaults. Any other link with the class `.safe-popup` will open at 320px, assuming no override is set on it.

### Media Processing
Let's assume you have multiple pages opening in the same popup window. Naming a target, i.e. `target="playlists"` will allow you to open multiple pages in the window named `playlists`. Opening a window using the target `playlists` is how the window name is created. Now let's assume that the playlists window uses hash or query strings on the url to cue media in one or more playlists. Once the window is open, loading a url with a new hash or query string will not trigger a reload to process the updated value so Popit conveniently provides this functionality for you.

#### Process Params
The `processParams` option is an opt-in boolean value set to `true` when you want to reload a named window with updated url parameters.

#### Wait To Process
The `waitToProcess` option is the delay on a timeout exposed for optimization.
