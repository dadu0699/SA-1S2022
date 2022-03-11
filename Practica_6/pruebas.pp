node 'pruebas' {

    exec {'server pruebas':
        command => 'docker run -d --name pareja3 -p 8081:80 201800726/pareja3',
        path => '/usr/bin',        
    }

}