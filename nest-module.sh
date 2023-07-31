#!/bin/bash
echo -e "\nEnter the name: "
read name

# create module, controller, service
nest g module $name --no-spec
nest g controller $name --no-spec
nest g service $name --no-spec