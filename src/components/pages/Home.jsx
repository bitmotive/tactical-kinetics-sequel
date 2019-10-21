/*
=====================================================
OMEGA19 Page
Home
=====================================================
*/

/* COMPONENTS */
import React from 'react';
import Template from '../Template';
import Metadata from '../Metadata';
import CollectionSpotlight from '../CollectionSpotlight';
import CollectionSpotlightItem from '../CollectionSpotlightItem';
import HeroBasic from '../HeroBasic';
import HeroGoogleMaps from '../HeroGoogleMaps';
import FeaturedProducts from '../FeaturedProducts';
import ProductItem from '../ProductItem';
import Testimonials from '../Testimonials';
import TestimonialsItem from '../TestimonialsItem';
import HeroVideo from '../HeroVideo';
import HeroImage from '../HeroImage';
import Spotlight from '../Spotlight';
import SpotlightItem from '../SpotlightItem';
import InstagramFeed from '../InstagramFeed';


/* STATIC RESOURCES */
import Logo from '../../static/img/updated/TK-Veneer.png';
import Icon from '../../static/img/updated/Tactical-Kinetics.png';
import Hero1 from '../../static/img/updated/Made-in-America_CTA.jpg';
import ProductImage1 from '../../static/img/no-image.png';
import HeroVideo1 from '../../static/videos/tkvideo.mp4';
import SamplePhoto1 from '../../static/img/updated/rifle-barrels.jpg';
import SamplePhoto2 from '../../static/img/updated/pistol-barrels.jpg';
import SamplePhoto3 from '../../static/img/updated/slides.jpg';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  didComponentMount() {

  }
  render() {
    return (
      <Template index>
        <Metadata title="Home"
                  description=""
                  url={this.props.location.pathname}/>
                <HeroVideo video={HeroVideo1} heading="Tactical Kinetics" subheading="Quality Barrels & Slides" buttonText="Shop All" buttonLink="/collection/all"/>

        <Spotlight>
            <SpotlightItem image={SamplePhoto1} title="Rifle Barrels" subtitle="" buttonText="View" buttonLink="/collection/all"/>
            <SpotlightItem image={SamplePhoto2} title="Pistol Barrels" subtitle="" buttonText="View" buttonLink="/collection/all"/>
            <SpotlightItem image={SamplePhoto3} title="Slides" subtitle="" buttonText="View" buttonLink="/collection/all"/>
        </Spotlight>

        {/* <CollectionSpotlight>
          <CollectionSpotlightItem title="Swag" image={CollectionSpotlightItem1}/>
          <CollectionSpotlightItem title="Rifle Parts" image={CollectionSpotlightItem2} center/>
          <CollectionSpotlightItem title="Tools" image={CollectionSpotlightItem3}/>
        </CollectionSpotlight> */}

        <FeaturedProducts title="Best Sellers" collectionID="all" limit={4}/>

        <HeroBasic short image={Hero1} heading="Made in America" subheading="High Quality Barrels & Slides" flip={true}/>

        <FeaturedProducts title="Newest Arrivals" collectionID="all" limit={4}/>
        <InstagramFeed />
      </Template>
    );
  }
}
