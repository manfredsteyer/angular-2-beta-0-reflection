import {Injectable} from 'angular2/core';

declare var fetch: any;

@Injectable()
export class FlugService {
    
    public find(von, nach) {
        
        var url = "http://www.angular.at/api/flug"
            + "?abflugOrt=" 
            + encodeURIComponent(von) 
            + "&zielOrt=" 
            + encodeURIComponent(nach);

        return fetch(url).then(r => r.json())
        
    }
    
}