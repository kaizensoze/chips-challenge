###########################################
# base for nodejs server and flask backends

class add-and-update-repos {
  $add_repo_prereq = ['build-essential', 'g++', 'software-properties-common', 'python-software-properties']
  package { $add_repo_prereq: 
    ensure => present,
  }

  exec { "add-go-repo":
    command => "/usr/bin/add-apt-repository ppa:gophers/go",
    require => Package[$add_repo_prereq],
    logoutput => true,
  }

  exec { "add-nginx-repo":
    command => "/usr/bin/add-apt-repository ppa:nginx/development",
    require => Package[$add_repo_prereq],
    logoutput => true,
  }

  exec { "apt-update":
    command => "/usr/bin/apt-get update",
    require => [ Exec["add-go-repo"], Exec["add-nginx-repo"] ],
    logoutput => true,
  }

  notify { "after-update":
    message => "Updated packages.",
  }
  Exec["apt-update"] -> Notify["after-update"]
}
class {'add-and-update-repos': }


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


# go
class go {
  package { "golang-stable":
    ensure => present,
  }
}
class {'go':
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
