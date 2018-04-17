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
            },
            {
                'id': 'tot',
                'title': 'Total Actividades',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/totales',
            },
            {
                'id': 'Carrousel',
                'title': 'Galeria',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/Carrousel',
            },
            
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
                'url': '/sector',
            },
         
            {
                'id': 'zonaelectoral',
                'title': 'Zona Electoral',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/zonaelectoral',
            },
            {
                'id': 'puestovotacion',
                'title': 'Puesto de Votacion',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/puestovotacion',
            },
            {
                'id': 'mesa',
                'title': 'Mesas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/mesa',
            },
             {
                'id': 'gerentesector',
                'title': 'Gerente de Sector',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/gerentesector',
            },
            {
                'id': 'Salir',
                'title': 'Salir',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'input',
                'url': '/login',
            },
            
            
            
            
            
        ]
    }
];

export const navigationDirectorDepartamento = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'tipoevento',
                'title': 'Creación Individuo 1',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'account_box',
                'url': '/individuo1',
            },
            {
                'id': 'metasdetalle',
                'title': 'Crear Detalle de Metas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'verified_user',
                'url': '/metasdetalle',
            },
            {
                'id': 'ListarMetasdetalle',
                'title': 'Listado Detalle de Metas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'verified_user',
                'url': '/ListarMetasdetalle',
            },
                 

            
            {
                'id': 'Salir',
                'title': 'Salir',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'input',
                'url': '/login',
            },
            
        ]
        
    },
    
];

export const navigatioGerenteSector = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'directordepartamento',
                'title': 'Lider Político',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'account_box',
                'url': '/directordepartamento',
            },
            {
                'id': 'metas',
                'title': 'Creación de Metas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'verified_user',
                'url': '/metas',
            },
            
            {
                'id': 'ListarMetasGer',
                'title': 'Listado de Metas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'verified_user',
                'url': '/ListarMetasGer',
            },
        ]
    },
    
    {
        'id': 'Reporte',
        'title': 'Reportes',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'Reporte1',
                'title': 'Reporte de Metas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'assessment',
                'url': '/ReporteMetas',
            },
           
            
            {
                'id': 'Salir1',
                'title': 'Salir',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'input',
                'url': '/login',
            },
            
        ]
        
    }


];

export const navigationIndividuo1 = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'tipoevento',
                'title': 'Creación Individuo 2',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'map',
                'url': '/individuo2',
            },
                     
            
            {
                'id': 'Salir',
                'title': 'Salir',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'input',
                'url': '/login',
            },
        ]
    }
];
