node 'produccion' {

    exec {'server produccion':
        command => 'docker run -d --name pareja3 -p 8082:80 201800726/pareja3',
        path => '/usr/bin',        
    }

}