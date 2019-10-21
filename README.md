# RogueShops-React
###### "OMEGA19" React Theme for RogueShops
A theme built to be dynamic as f*ck. Use this as a blank slate to build out your site with our pre-built rich objects made with love and finesse, or you can do whatever the hell you want with it...that's the beauty of open source baby!

> #### Table of Contents
> * Getting started
> 	* Install
> 	* Start
> * Objects & Components
>   * Template
>   * Metadata
>   * Navigation
>   * NavigationItem
>   * CollectionSpotlight
>   * CollectionSpotlightItem
>   * FeaturedProducts
>   * ProductItem
>   * HeroBasic
>   * HeroGoogleMaps
>   * HeroVideo
>   * HeroSpacey
>   * Tabs
>   * TabsPage
>   * Testimonials
>   * TestimonialsItem
>   * PictureWithContent
>   * VideoWithContent
>   * CollectionConstructor
> * Templates
>   * Home
>   * Search
>   * Collection
>   * Product
>   * Cart
>   * Checkout
>   * Register
>   * Login
> * Styling

## Getting started
#### Install
After pulling the repository, use `npm install` to install React dependencies.
#### Start
Use `npm start` to start the node server. This should pull up a live page in your default browser.

## Objects & Components

### Template
Base object that straps around each page which contains objects like the header and footer.

Edit this if you would like to change the structure for how pages are layed out.
***

### Metadata
Used to define OpenGraph and meta data for the page. (Important)
##### Parameters
* title `string`
* description `string`
* image `string`
    * Defaults to the image defined in component if this is not defined
* url `string`
    * Should be equal to `this.props.location.pathname` to refer back to the current page.

***


### Navigation
The navigation bar at the header used for traversing the site.
##### Parameters
* logo `image`
* disableSearchBar `boolean`
* sticky `boolean`

##### Children
* NavigationItem


### NavigationItem
The items used in the navigation bar.
##### Parameters
* title `string`
* link `string`
* external `boolean`
    * Enable this to allow links to external sites.

***

### CollectionSpotlight
A wide & clickable collection spotlight section. Usually has 3 children.
##### Children
* CollectionSpotlightItem

### CollectionSpotlightItem
One of the clickable collection buttons.
##### Parameters
* link `string`
* title `string`
* center

***

### FeaturedProducts
A sections where you can feature products from a chosen collection.
##### Parameters
* title `string`
* center `boolean`
* collectionID `integer`
* limit `integer`
    * 4 by default
* useChildren `boolean`
    * If enabled, will use children as rendering material (i.e. `<ProductItem .../>`).
* sample `boolean`
    * If enabled, will generate products based on the amount of children tags (use any tag i.e. `<div></div>`).


### ProductItem
A clickable product item component with a picture, title, and price for the product which will bring you to a link of your choosing.
##### Parameters
* image `string`
* title `string`
* price `string`
* link `string`
* className `string`
* soldOut `boolean`
* collection `boolean`
    * If enabled, will add styles specific to collection product items.

***

### HeroBasic
A basic full-width hero banner for static images.
##### Parameters
* image `string` 
* heading `string`
* subheading `string`
* buttonText `string`
    * If this is not null, it will enable the button automatically.
* buttonLink `string`
* flip `boolean`
* unselectable `boolean`
* short `boolean`

### HeroVideo
A hero based off of HeroBasic but can be used with a video instead of a static image.
##### Parameters
* video `string`
* heading `string`
* subheading `string`
* buttonText `string`
    * If this is not null, it will enable the button automatically.
* buttonLink `string`
* flip `boolean`
* unselectable `boolean`
* short `boolean`

### HeroSpacey
A elegant-looking hero with the ability to steal your woman so watch out.
##### Parameters
* image `string`
* buttonText `string`
    * If this is not null, it will enable the button automatically.
* buttonLink `string`

##### Example

    <HeroSpacey image={AwesomeImage} buttonText="More Info" buttonLink="/product/garbage">
        <h1>Hello world!</h1>
        <p>The light is your friend. Preserve it. But we're not there yet, so we don't need to worry about it. Nice little fluffy clouds laying around in the sky being lazy. Work on one thing at a time.</p>
    </HeroSpacey>

***

### PictureWithContent
A side-by-side content section.

##### Parameters
* image `string`
* limitPictureHeight `integer`

##### Children
* Any


### VideoWithContent
A side-by-side content section.

##### Parameters
* video `string`
* loop `boolean`

##### Children
* Any

***

### Tabs
A sections where you can have content on tabs so that you can display all of your sick & nasty information.
##### Parameters
* className

##### Children
* TabsPage


### TabsPage
The pages where you actually put your sick & nasty information.
##### Parameters
* title `string`


##### Example

    <Tabs>
        <TabsPage title="Description">
            <h1>Super awesome page title</h1>
            <p>This product blah blah blah: blah blah. Blah, blah blah. Thank you.</p>
        </TabsPage>
        <TabsPage title="Sizes">
            <h1>Another super awesome page title</h1>
            <p>The sizes for this product blah blah blah:</p>
            <ul>
                <li>Blah</li>
                <li>Blah</li>
                <li>Blah</li>
            </ul>
        </TabsPage>
    </Tabs>

***

### Testimonials
Show off your most beloved customers or that quote from that one news place.
##### Children
* TestimonialsItem

##### Example

    <Testimonials>
        <TestimonialsItem author="Joe" image={LogoPBS}>
            It's pretty cool I guess.
        </TestimonialsItem>
        <TestimonialsItem author="Raphael" image={LogoPBS}>
            I really hate Magento so literally anything is better than that.
        </TestimonialsItem>
        <TestimonialsItem author="Hayden" image={LogoPBS}>
            Very awesome framework. Would be better if it supported machine learning though.
        </TestimonialsItem>
    </Testimonials>

### TestimonialsItem
The items used for the testimonials object.
##### Parameters
* author `string`
* image `string`

***

### CollectionConstructor
Grabs the collection and renders it to the component
##### Parameters
* id `integer`
* title `string`


## Templates
* Home
* Search
* Collection
* Product
* Cart
* Checkout
* Register
* Login


## Styling
This application uses [Sass](https://sass-lang.com/) for styling the page so it's fully customizable. All global styling should be put at the top of the style sheet for ease of access.

If you need a quick rundown of what's in Sass, [check out this page](https://devhints.io/sass)!

All styling for the application is contained in `/src/static/main.scss`.
