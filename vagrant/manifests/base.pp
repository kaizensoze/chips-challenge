###########################################
# base for nodejs server and flask backends

# class add-and-update-repos {
#   $add_repo_prereq = ['build-essential', 'g++', 'software-properties-common', 'python-software-properties']
#   package { $add_repo_prereq: 
#     ensure => present,
#   }

#   exec { "add-nodejs-repo":
#     command => "/usr/bin/add-apt-repository ppa:chris-lea/node.js",
#     require => Package[$add_repo_prereq],
#     logoutput => true,
#   }

#   exec { "add-nginx-dev-repo":
#     command => "/usr/bin/add-apt-repository ppa:nginx/development",
#     require => Package[$add_repo_prereq],
#     logoutput => true,
#   }

#   exec { "apt-update":
#     command => "/usr/bin/apt-get update",
#     require => [ Exec["add-nodejs-repo"], Exec["add-nginx-dev-repo"] ],
#     logoutput => true,
#   }

#   notify { "after-update":
#     message => "Updated packages.",
#   }
#   Exec["apt-update"] -> Notify["after-update"]
# }
# class {'add-and-update-repos': }


# nodejs
# class nodejs {
#   package { "nodejs":
#     ensure => present,
#   }

#   exec { "npm-async":
#     command => "/usr/bin/npm install async -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }
#   exec { "npm-db-migrate":
#     command => "/usr/bin/npm install db-migrate -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }
#   exec { "npm-deferred":
#     command => "/usr/bin/npm install deferred -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }
#   exec { "npm-forever":
#     command => "/usr/bin/npm install forever -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }
#   exec { "npm-mysql":
#     command => "/usr/bin/npm install mysql@~2.0.0-alpha7 -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }
#   exec { "npm-prompt":
#     command => "/usr/bin/npm install prompt -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }
#   exec { "npm-q":
#     command => "/usr/bin/npm install q -g",
#     require => Package["nodejs"],
#     logoutput => true,
#   }

#   # FIXME: This should be templatized in a module. 
#   file { "node.conf":
#     name => "/etc/init/node.conf",
#     owner => root,
#     group => root,
#     source => "${share_folder}/vagrant/manifests/node.conf",
#     ensure => present,
#   }

#   service { "node":
#     ensure => running,
#     require => [Exec["npm-forever"],Exec["npm-async"],Exec["npm-db-migrate"],Exec["npm-deferred"],Exec["npm-mysql"],Exec["npm-prompt"],Exec["npm-q"]],
#   }
# }

# class {'nodejs':
#   require => Class["add-and-update-repos"],
# }


# nginx
class nginx {
  package { "nginx":
    ensure => present,
  }

  service { "nginx":
    ensure => running,
  }

  file { "nginx.conf":
    name => "/etc/nginx/nginx.conf",
    owner => root,
    group => root,
    source => "${share_folder}/vagrant/manifests/nginx/nginx.conf",
    ensure => present,
    notify => Service["nginx"],
    require => Package["nginx"]
  }

  file { "common.conf":
    name => "/etc/nginx/common.conf",
    owner => root,
    group => root,
    source => "${share_folder}/vagrant/manifests/nginx/common.conf",
    ensure => present,
    notify => Service["nginx"],
    require => Package["nginx"]
  }

  file { "remove-default-vhost":
    name => "/etc/nginx/sites-available/default",
    ensure => absent,
  }

  file { "remove-default-vhost-symlink":
    name => "/etc/nginx/sites-enabled/default",
    ensure => absent,
  }

  file { "vhost":
    name => "/etc/nginx/sites-available/${host_name}",
    owner => root,
    group => root,
    source => "${share_folder}/vagrant/manifests/${project_name}-site",
    ensure => present,
    notify => Service["nginx"],
    require => Package["nginx"]
  }

  file { "vhost-symlink":
    name => "/etc/nginx/sites-enabled/${host_name}",
    ensure => "link",
    target => "/etc/nginx/sites-available/${host_name}",
    require => File["vhost"],
    notify => Service["nginx"],
  }
}
class {'nginx':
  require => Class["add-and-update-repos"],
}

# mongo
class mongo {
  package { 'mongodb': 
    ensure => installed,
  } ->
  service { 'mongodb': 
    ensure => running,
  }
}
class {'mongo': 
  require => Class['add-and-update-repos'],
}
