export const navigation = [
    {
        'id': 'applications',
        'title': 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'sample',
                'title': 'Sample',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'email',
                'url': '/sample',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.SAMPLE.BADGE',
                    'bg': '#F44336',
                    'fg': '#FFFFFF'
                }
            }
           
        ]
    }
];

export const navigationClient = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'map',
                'title': 'Mapa',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/Maps',
            }
        ]
    }
];

export const navigationAdmin = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'tipoevento',
                'title': 'Tipo Evento',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/tipoevento',
            },
            {
                'id': 'aceptimage',
                'title': 'Aprobar Imagenes',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/aceptimage',
            },
            {
                'id': 'paramsectores',
                'title': 'Sectores',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/paramsectores',
            },
            
        ]
    }
];
