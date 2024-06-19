import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

constructor() { }

  getContent(): any {
    return {
      "es": {
        "title": "Viaje de destino",
        'description': "Consulta tu destino, como tipo de cambio y el clima",
        "country": "País",
        "city": "Ciudad",
        "destiniy": "Destino",
        "error_country": "País es obligatorio",
        "error_city": "Ciudad es obligatorio",
        "baget": "Presupuesto",
        "error_baget": "Presupuesto es obligarotio",
        "baget_desp": "Presupuesto en pesos colombianos",
        "summary": "Resumen",
        "temperature": "Temperatura",
        "change": "Tipo de cambio",
        "currency": "Moneda",
        "rate": "Tasa de cambio",
        "total": "Total",
        "btn_next": "Siguiente",
        "btn_back": "Atras",
        "btn_again": "Volver al inicio",
        "wheater": "Clima"
      },
      "gn": {
        "title": "Zielreise",
        'description': "Überprüfen Sie Ihr Reiseziel, z. B. Wechselkurs und Wetter",
        "country": "Land",
        "city": "Stadt",
        "destiniy": "Ziel",
        "error_country": "Land ist erforderlich",
        "error_city": "Stadt ist erforderlich",
        "baget": "Budget",
        "baget_desp": "Budget in kolumbianischen Pesos",
        "error_baget": "Das Budget ist obligatorisch",
        "summary": "Zusammenfassung",
        "temperature": "Temperatur",
        "change": "Tauschrate",
        "currency": "Währung",
        "rate": "Tauschrate",
        "total": "Gesamt",
        "btn_next": "Nachfolgend",
        "btn_back": "angezogen",
        "btn_again": "Zurück nach oben",
        "wheater": "Klima"
      }
    };
  }

}

