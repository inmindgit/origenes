# Origenes 

## Smartcontract, Node Server and webplatform

This platform is composed by a smart contract (this repo) , web platform and node server (https://github.com/inmindgit/origenes_node) 

This application provides access to add humans as well as ask for genetic samples to be further inserted and look for coincidences
There is 4 user profiles Admin, Laboratory, Operator and Viewer.

You can see it working by browsing : https://origenes-aepp.herokuapp.com/ and do the following instructions https://drive.google.com/file/d/10GPl8PJVafS80NIjOg7nlFw4K9i3lApe/view?usp=sharing

## Smart Contract

This platforms works with Smart Contracts based on aeternity.com blockchain .

(this doesn't need to be installed for making this project work unless you want to run it fully local)


1) First install the web platform by following https://github.com/inmindgit/origenes_node guide


# Orígenes quick start smart contract install

## Requirements

In order to have aeproject working you must have installed the following:

   ```
   nodejs 9.5.0 
   python 
   docker
   ```

Note: For older versions on widnows you can use docker-toolbox. This will install docker-compose as part of the toolkit. Please bear in mind that the your docker-compose version must be at least @1.20.0 

Note2: If you are willing to use the *fire-editor* aepp locally with *aeproject* you would need to use version not lower to 10.9.0. For more information    check [aeproject fire-editor](developer-documentation/aeproject-cli/fire-editor.md))

## Install


   npm install -g aeproject



## For running origins smart contract test

   1) aeproject env
   2) aeproject compiler
   3) aeproject test

Note: In case of the following error 

      Error: Cannot find module ‘aeproject-utils’

   run 
   
      npm install aeproject-utils prompts aeproject-logger

   And try step 3 again
