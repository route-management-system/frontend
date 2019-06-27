import React, { Component } from 'react';
import SearchBox from './SearchBox';

class AzureMap extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         map: {},
    //         datasource: {},
    //         drawingTools: {},
    //         cameraPosition: [18.06918218638046, 59.326884478588596], //Default: Stockholm
    //         isPageLoaded: false,
    //         isDrawButtonDisabled: false,
    //         polygonCoordinates: '',
    //         isEditingPolygonData: false,
    //         undoManualChanges: [],
    //         defaultEditRows: 5
    //     };
    // }

    // componentDidMount() {
    //     this.loadMaps(this.props.coordinates);
    // }

    // search = () => {

    //     }
    

    // loadMaps(savedPolygon) {
    //     this.state.map = new atlas.Map('map-element', {
    //         center: this.state.cameraPosition,
    //         zoom: 12,
    //         maxZoom:20,
    //         language: 'en-US',

    //         authOptions: {
    //             authType: 'subscriptionKey',
    //             subscriptionKey: 'druzvY1gFuIVmFZaZEb19x8uQ4O1Li1SeIJqfHe47Ng'
    //         }
    //     });

    //     if (this.props.zoom === 'true') {
    //         const zoomControl = new atlas.control.ZoomControl();
    //         this.state.map.controls.add(zoomControl,
    //             {
    //                 position: "top-right" //bootstrap style problems when changing this value
    //             });
    //     }

    //     //Wait until the map resources are ready.
    //     this.state.map.events.add('ready', () => {
    //         this.state.datasource = new atlas.source.DataSource();
    //         this.state.map.sources.add(this.state.datasource);

    //     });



    //     const mapTimer = setInterval(() => {
    //         if (this.state.map.loaded) {
    //             this.setState({ isPageLoaded: this.state.map.loaded });
    //             clearTimeout(mapTimer);
    //         }
    //     }, 500);
    // }


    // getMyPosition = () => {
        /** NOT ABLE TO TEST DUE TO TELIA BLOCK */

        //if (navigator.geolocation) {
        //    const options = {
        //        enableHighAccuracy: true,
        //        timeout: 5000,
        //        maximumAge: 0
        //    };

        //    navigator.geolocation.getCurrentPosition((position) => {
        //        console.log(position);
        //TODO: PLACE CODE BELOW HERE AND USE position.coords.latitude/longitude IN bBox VARIABLE
        //    }, (error) => {
        //        console.warn(error);
        //    }, options);
        //}

        // const point = [18.06918218638046, 59.326884478588596]; //Default: Stockholm
        // this.state.map.setCamera({
        //     zoom: 12,
        //     center: point,
        //     duration: 1000,
        //     type: 'fly'
        // });
    // }
    render() {
        return (
            <>
                <SearchBox map={this.state.map} />
                {/* <div>
                    <div id="map-element"></div>
                </div> */}
            </>
        );
    }
}

export default  AzureMap;