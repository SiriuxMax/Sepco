export class E_Individuo1 {
    public Id: number
    public Cedula: string
    public Nombre: string
    public Apellido: string
    public Direccion: string
    public Correo: string
    public Telefono: string
    public Celular: string
    public Estado: boolean
    public FechaCreacion: Date
    public Id_DirectorDepto: number
    public Id_tipoindividuo: number
    public Id_TipoEstadoRevision: number
    public CambiarClave: boolean
    public Id_Departamento: number
    public usuariosac: E_UsuarioSACxIndividuo1
    constructor() { }
}

export class E_UsuarioSACxIndividuo1 {
    public Id: number
    public Id_individuo1: number
    public FechaUltimaModificacion: Date
    public observacionsac: string
    constructor(){}
}