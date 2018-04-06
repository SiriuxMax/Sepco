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
            , {
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
