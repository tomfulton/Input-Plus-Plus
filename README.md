![Input Plus Plus](https://raw.githubusercontent.com/epiphanysearch/input-plus-plus/master/images/epiphany-logo.png)

# Input Plus Plus for Umbraco

Input Plus Plus for Umbraco is a property editor prepending and appending content to inputs.

##Build Status

[![Build status](https://ci.appveyor.com/api/projects/status/noypkb67ri0ns83m?svg=true)](https://ci.appveyor.com/project/ryanmcdonough/input-plus-plus)


## Recent Changes

**0.1.0**

* Initial release


## Installation

Install the latest version through NuGet.
```
Install-Package Epiphany.InputPlusPlus
```

After installing via Nuget, create a property of type **Input++** and include on your page. 

![Property editor options](https://raw.githubusercontent.com/epiphanysearch/input-plus-plus/master/images/property-editor-options.png)

Alternatively, if you want to hack around with the project, you can fork, checkout and develop locally. See the [Developing Input Plus Plus](#Developing Input Plus Plus) section.

## Configuration

<dl>
    <dt>Prepended Text</dt>
    <dd>Will appear before the input</dd>
    
    <dt>Appended Text</dt>
    <dd>Will appear after the input</dd>
    
    <dt>Placeholder Text</dt>
    <dd>Text that appears in the textbox</dd>
    
    <dt>Additional classes</dt>
    <dd>Seperate with a space. Classes here are added to the input. See Bootstrap 2.3 docs for some sizes. Example: input-small</dd>
    
    <dt>Inline Styles</dt>
    <dd>If set, will be added as a style attribute to the input</dd>
</dl>

## Developing Input Plus Plus

### Checkout the project
```bash
git clone https://github.com/epiphanysearch/input-plus-plus.git
cd input-plus-pus
```

### Install Dependencies

```bash
npm install -g grunt-cli
npm install
```

### Build

```bash
build.cmd
grunt
```

If you wish to build it to a local Umbraco directory, use the `target` option.

```bash
grunt --target=c:\dev\path-to-umbraco-root-dir
```
