/*
 * ISC License (ISC)
 * Copyright (c) 2018 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */

const Deployer = require('aeproject-lib').Deployer;
const EXAMPLE_CONTRACT_PATH = "./contracts/FreedomOrigins.aes";

describe('FreedomOrigins Contract', () => {

    let deployer;
    let instance;
    let ownerKeyPair = wallets[0];
    let notOwnerKeyPair = wallets[1];
   

    before(async () => {
        deployer = new Deployer('local', ownerKeyPair.secretKey)
    })

    it('Deploying Example Contract', async () => {
        const deployedPromise = deployer.deploy(EXAMPLE_CONTRACT_PATH) // Deploy it

        await assert.isFulfilled(deployedPromise, 'Could not deploy the ExampleContract Smart Contract'); // Check whether it's deployed
        instance = await Promise.resolve(deployedPromise)
    })

    it('Check version 1', async () => {
        

        let version = (await instance.version()).decodedResult

        assert.isTrue(version==1, 'wrong version')
    })
    it('Add admin', async () => { //email_to_add:string, name_to_add:string, profile_id:int, address_to_add:address
     
        let works = ( await instance.add_user("omar@mail.com","Omar",1,ownerKeyPair.publicKey)).decodedResult

        assert.isTrue(works==true, 'user has not been created')
    })

    //add_human(case_number:string, human_to_add:human, personal_data_to_add:personal_Data)
    /*record personal_Data = {
    //    case_number:string,
    //    document_id:string,
        registry_country:string,
        identity_country:string,
        name:string,
        last_name:string,
        address:string,
        phone_number:string,
        email:string,
        contact:string}*/
    it('Add Human 1', async () => {  
        
        const personal_data_human = {case_number:"CN0001",
                                    document_id:"DI1234",
                                    registry_country:"UY", 
                                    identity_country:"UY", 
                                    name:"Nombre",
                                    last_name:"Apellido",
                                    address:"DIreccion de la persona",
                                    phone_number:"099892175",
                                    email:"correo@correo.com",
                                    contact:"datos de contacto extra"}
        
        const human_to_add = {case_number:"CN0001",personal_data:personal_data_human}
     

        let works = ( await instance.add_human("CN0001",human_to_add,personal_data_human)).decodedResult

        assert.isTrue(works==true, 'human has not been added')
    })    
    it('Add Human 2', async () => {  
        
        const personal_data_human = {case_number:"CN0002",
                                    document_id:"DI1235",
                                    registry_country:"UY", 
                                    identity_country:"UY", 
                                    name:"Nombre",
                                    last_name:"Apellido",
                                    address:"DIreccion de la persona",
                                    phone_number:"099892175",
                                    email:"correo@correo.com",
                                    contact:"datos de contacto extra"}
        
        const human_to_add = {case_number:"CN0002",personal_data:personal_data_human}
     

        let works = ( await instance.add_human("CN0002",human_to_add,personal_data_human)).decodedResult

        assert.isTrue(works==true, 'human has not been added')
    })    
    it('Add Human 3', async () => {  
        
        const personal_data_human = {case_number:"CN0003",
                                    document_id:"DI1236",
                                    registry_country:"UY", 
                                    identity_country:"UY", 
                                    name:"Nombre",
                                    last_name:"Apellido",
                                    address:"DIreccion de la persona",
                                    phone_number:"099892175",
                                    email:"correo@correo.com",
                                    contact:"datos de contacto extra"}
        
        const human_to_add = {case_number:"CN0003",personal_data:personal_data_human}
     

        let works = ( await instance.add_human("CN0003",human_to_add,personal_data_human)).decodedResult

        assert.isTrue(works==true, 'human has not been added')
    })
    
    
    //ingreso de muestras
    /*
      add_dna_sample(sample_to_add:dNA_Sample,case_number:string) =
    */ 
   it('Add sample for human 3', async () => {  
    
    const system = {name:"SNP"}
    const dna_analysis = { doneDate:"21.07.2020",
                            case_number:"CN0003",
                            snp_result:["11","10","01","00"],
                            str_result:[]}
    const dna_Sample_to_add = { system:system,
                                analysis:dna_analysis }
     
    let works = ( await instance.add_dna_sample(dna_Sample_to_add,"CN0003")).decodedResult

    assert.isTrue(works==true, 'human has not been added')
    })
    it('Add sample for inexisting human', async () => {  
        
        const system = {name:"SNP"}
        const dna_analysis = { doneDate:"21.07.2020",
                                case_number:"CND0001",
                                snp_result:["11","10","01","00"],
                                str_result:[]}
        const dna_Sample_to_add = { system:system,
                                    analysis:dna_analysis }
        
        
        assert.isRejected(instance.add_dna_sample(dna_Sample_to_add,"CND0001"))
        })
   
        //entrypoint ask_for_sample_dna_test(document_id:string) : string = 
   it('Ask for DNA sample test for existing human with ID DI1234 and CN0001', async () => {  
        let works = ( await instance.ask_for_sample_dna_test("DI1234")).decodedResult
        console.log(works)
        assert.isTrue(works=="CN0001", 'human has not been added')
    })

    it('Ask for DNA sample test for inexisting human', async () => { 
        assert.isRejected(instance.ask_for_sample_dna_test("DI12"))
    })

    it('Show human list', async () => { 
       console.log((await instance.get_humansl()).decodedResult)
    })
    it('Show human map', async () => { 
        console.log((await instance.get_humansm()).decodedResult)
    })

    //look_for_match
    it('Look for matching dna SNP sample ["00","10","01","00"] for existing human 3 with ["11","10","01","00"] and 1 fail so match', async () => {  
        
        const system = {name:"SNP"}
        const dna_analysis = { doneDate:"21.07.2020",
                                case_number:"CND0001",
                                snp_result:["01","10","01","00"],
                                str_result:[]}
        const dna_Sample_to_find = { system:system,
                                    analysis:dna_analysis }
        
        let works = ( await instance.look_for_match(dna_Sample_to_find)).decodedResult
        
        assert.isTrue(works[0]!=undefined)
        
    })
    it('Look for non matching dna SNP sample', async () => {  
    
        const system = {name:"SNP"}
        const dna_analysis = { doneDate:"21.07.2020",
                                case_number:"CND0001",
                                snp_result:["11","11","11","11"],
                                str_result:[]}
        const dna_Sample_to_find = { system:system,
                                    analysis:dna_analysis }
        
       
        assert.isRejected(instance.look_for_match(dna_Sample_to_find))
        
        })
    it('Look for matching dna SNP sample border case 3 fails', async () => {  

        const system = {name:"SNP"}
        const dna_analysis = { doneDate:"21.07.2020",
                                case_number:"CND0001",
                                snp_result:["11","11","11","00"],
                                str_result:[]}
        const dna_Sample_to_find = { system:system,
                                    analysis:dna_analysis }
        

        let works = ( await instance.look_for_match(dna_Sample_to_find)).decodedResult

        assert.isTrue(works[0]!=undefined)
        
        })

})