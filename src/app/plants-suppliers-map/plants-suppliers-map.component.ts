import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Browser, Map, map, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { Plant } from '../plants/plant';
import { SupplierTooltip } from '../suppliers/supplierTooltip';
import { TranslationService } from '../language-changer/translation-service';

class LegendControl extends L.Control {
  onAdd(map) {
    const legend = L.DomUtil.create('div', 'legend');
    legend.innerHTML = `
    <div style="background-color: black; color: white">
      <h4 style="text-align: center">Legend</h4>
      <div style="display: grid; grid-template-columns: repeat(1, 2fr);">
        <div style="display: flex; align-items: center;">
          <span style="background-color: red;
          width: 1rem;
          height: 1rem;
          display: block;
          left: -0.5rem;
          top: -0.5rem;
          position: relative;
          border-radius: 1rem 1rem 0;
          transform: rotate(45deg);
          border: 1px solid #FFFFFF"></span>
          <span class="legend-label">Plants</span>
        </div>

        <div style="display: flex; align-items: center;">
          <span style="background-color: blue;
          width: 1rem;
          height: 1rem;
          display: block;
          left: -0.5rem;
          top: -0.5rem;
          position: relative;
          border-radius: 1rem 1rem 0;
          transform: rotate(45deg);
          border: 1px solid #FFFFFF"></span>
          <span class="legend-label">Suppliers</span>
        </div>
      </div>
    </div>

    `;
    return legend;
  }
}


@Component({
  selector: 'app-plants-suppliers-map',
  templateUrl: './plants-suppliers-map.component.html',
  styleUrls: ['./plants-suppliers-map.component.css']
})
export class PlantsSuppliersMapComponent implements OnInit, AfterViewInit {
  @Input() supplierTooltipsForMap: SupplierTooltip[];
  @Input() plantsForMap: Plant[];
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  plantMarkers: any[] = [];
  supplierMarkers: any[] = [];

  constructor(public translationService: TranslationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.supplierTooltipsForMap);
    console.log(this.plantsForMap);
    const initialState = { lng: 11, lat: 49, zoom: 4 };

    const lefletMap: Map = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const isRetina = Browser.retina;
    const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: '',
      apiKey: 'd2039c6f687047b0872578858bf86af8',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(lefletMap);

    const legendControl = new LegendControl();
    legendControl.addTo(lefletMap);

    const plantColour = 'red'

    const plantMarkerHtmlStyles = `
    background-color: ${plantColour};
    width: 1rem;
    height: 1rem;
    display: block;
    left: -0.5rem;
    top: -0.5rem;
    position: relative;
    border-radius: 1rem 1rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

    const plantIcon = L.divIcon({
      className: "my-custom-pin",
      // iconAnchor: [0, 24],
      // popupAnchor: [0, -36],
      html: `<span style="${plantMarkerHtmlStyles}" />`
    })

    const supplierColour = 'blue'

    const supplierMarkerHtmlStyles = `
    background-color: ${supplierColour};
    width: 1rem;
    height: 1rem;
    display: block;
    left: -0.5rem;
    top: -0.5rem;
    position: relative;
    border-radius: 1rem 1rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`

    const supplierIcon = L.divIcon({
      className: "my-custom-pin",
      // iconAnchor: [0, 24],
      // popupAnchor: [0, -36],
      html: `<span style="${supplierMarkerHtmlStyles}" />`
    })

    this.plantsForMap.forEach(plant => {
      this.plantMarkers.push(L.marker([plant.cityLatitude, plant.cityLongitude], { icon: plantIcon }).addTo(lefletMap).bindPopup(`
      ${this.translationService.getTranslation('id')}: ${plant.id}<br/>
      ${this.translationService.getTranslation('segment')}: ${plant.segment}<br/>
      ${this.translationService.getTranslation('cityCountry')}: ${plant.cityCountry}<br/>
      ${this.translationService.getTranslation('latitude')}: ${plant.cityLatitude}<br/>
      ${this.translationService.getTranslation('longitude')}: ${plant.cityLongitude}<br/>
      `
      ));
    });
    this.supplierTooltipsForMap.forEach(supplierTooltip => {
      this.plantMarkers.push(L.marker([supplierTooltip.cityLatitude, supplierTooltip.cityLongitude], { icon: supplierIcon }).addTo(lefletMap).bindPopup(`
      ${this.translationService.getTranslation('id')}: ${supplierTooltip.id}<br/>
      ${this.translationService.getTranslation('name')}: ${supplierTooltip.name}<br/>
      ${this.translationService.getTranslation('cityCountry')}: ${supplierTooltip.cityCountry}<br/>
      ${this.translationService.getTranslation('totalNumberDeliveries')}: ${supplierTooltip.totalNumberDeliveries}<br/>
      ${this.translationService.getTranslation('correctDeliveriesPercentage')}: ${supplierTooltip.correctDeliveriesPercentage.toFixed(2)}<br/>
      ${this.translationService.getTranslation('qtyDeviationCurveRating')}: ${supplierTooltip.qtyDeviationCurveRating.toFixed(2)}<br/>
      ${this.translationService.getTranslation('dayDeviationCurveRating')}: ${supplierTooltip.dayDeviationCurveRating.toFixed(2)}<br/>
      ${this.translationService.getTranslation('averageNumberOfHoursToDeliver')}: ${supplierTooltip.averageNumberOfHoursToDeliver.toFixed(2)}<br/>
      ${this.translationService.getTranslation('averageNumberOfHoursLeadTime')}: ${supplierTooltip.averageLeadTimeInHours.toFixed(2)}<br/>
      ${this.translationService.getTranslation('latitude')}: ${supplierTooltip.cityLatitude}<br/>
      ${this.translationService.getTranslation('longitude')}: ${supplierTooltip.cityLongitude}<br/>
      `
      ));
    });

  }

}
