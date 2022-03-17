terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
    }
  }
}

provider "google" {
  version = "3.5.0"

  project = "sa-1s2022"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_compute_instance" "vm_instance" {
  name          = "practica7-vm"
  machine_type  = "e2-medium"

  tags = ["jenkins", "allout"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
    }
  }

  network_interface {
    network = "default"

    access_config {
      nat_ip = "34.123.102.168"
    }
  }

  metadata_startup_script = file("./scripts/production.startup_script.sh")
}
