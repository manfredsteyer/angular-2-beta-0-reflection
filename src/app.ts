import {Component, provide, Input, ComponentMetadata, InputMetadata, reflector} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {FlugService} from './flug-service';


@Component({
    selector: 'app', // <app></app>
    templateUrl: 'src/app.html'
})
export class App {
    
    @Input() info: string;
    
    von: string = "Graz";
    nach: string = "Hamburg";
    
    flugService: FlugService;
    
    message: string = "";
    selectedFlug: any;
    
    fluege: Array<any> = [];
        
    constructor(flugService: FlugService) {
        this.flugService = flugService;
    }
    
    suchen() {
            this
            .flugService
            .find(this.von, this.nach)
            .then(fluege => {
                this.fluege = fluege;
            });
    }
    
    select(flug) {
        this.selectedFlug = flug;
    }
    
}

//
//  Metadaten mit Möglichkeiten von Angular 2 lesen
//

var annotations = reflector.annotations(App);

for(var a of annotations) {
    if (a instanceof ComponentMetadata) {
        console.debug("ComponentMetadata");
        var compMetadata = <ComponentMetadata>a;
        console.debug("selector: " + compMetadata.selector);
        console.debug("------------");
    }
}

var propMetadata = reflector.propMetadata(App);

// propMetadata ist kein Array sondern ein Objekt, das als Dictionary genutzt wird
// Deswegen for-in und nicht for-of !!

for(var key in propMetadata) {
    // Pro Property kann es mehrere Metadateneinträge geben
    // Hier wird nach einem Eintrag vom Typ InputMetadata gesucht
    for (var md of propMetadata[key]) {
        if (md instanceof InputMetadata) {
            console.debug("InputMetadata");
            console.debug(key);
            console.debug("------------");
        }
    }
}


//
//  Metadaten entsprechend Proposal für ES 7 [1] lesen:
//  [1] https://www.npmjs.com/package/reflect-metadata
//

/*
// -----
declare var Reflect: any;

var keys = Reflect.getMetadataKeys(App);

// Iterate all metadata-keys
for(var key of keys) {
    console.debug(key);
    var metadata = Reflect.getMetadata(key, App);
    console.debug(metadata);
    console.debug("------------");
}

// Get ComponentMetadata
var annotations = Reflect.getMetadata("annotations", App);

for(var a of annotations) {
    if (a instanceof ComponentMetadata) {
        console.debug("ComponentMetadata");
        var compMetadata = <ComponentMetadata>a;
        console.debug("selector: " + compMetadata.selector);
        console.debug("------------");
    }
}

// Get InputMetadata
var propMetadata = Reflect.getMetadata("propMetadata", App);

// propMetadata ist kein Array sondern ein Objekt, das als Dictionary genutzt wird
// Deswegen for-in und nicht for-of !!

for(var key in propMetadata) {
    // Pro Property kann es mehrere Metadateneinträge geben
    // Hier wird nach einem Eintrag vom Typ InputMetadata gesucht
    for (var md of propMetadata[key]) {
        if (md instanceof InputMetadata) {
            console.debug("InputMetadata");
            console.debug(key);
            console.debug("------------");
        }
    }
}
*/

var services = [
    FlugService,     // FlugService --> FlugService
    //provide(FlugService, {useClass: FlugService})
];

bootstrap(App, services);
