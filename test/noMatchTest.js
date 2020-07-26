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
describe('NoMatch Logic test of FreedomOrigins Contract', () => {

    let deployer;
    
    let instance;
    
    let ownerKeyPair = wallets[0]; 
    let deployedContract;

    before(async () => {
        deployer = new Deployer('local', ownerKeyPair.secretKey)
        deployedContract = deployer.deploy(EXAMPLE_CONTRACT_PATH,[]) // Deploy it
    })

    it('Deploying Example Contract', async () => {
    
        await assert.isFulfilled(deployedContract, 'Could not deploy the ExampleContract Smart Contract'); // Check whether it's deployed
        instance = await Promise.resolve(deployedContract)
    })

    it('Check version 1', async () => {
        

        let version = (await instance.version()).decodedResult

        assert.isTrue(version==1, 'wrong version')
    })
    
    //human 8

    it('Add Human 8', async () => {  
        
        const personal_data_human = {case_number:"CN0008",
                                    document_id:"DI0008",
                                    registry_country:"UY", 
                                    identity_country:"UY", 
                                    name:"Nombre",
                                    last_name:"Apellido",
                                    address:"DIreccion de la persona",
                                    phone_number:"099892175",
                                    email:"correo@correo.com",
                                    contact:"datos de contacto extra"}
        
        const human_to_add = {case_number:"CN0008",personal_data:personal_data_human}
     

        let works = ( await instance.add_human("CN0008",human_to_add,personal_data_human)).decodedResult
        let human08 =  ( await instance.get_human_by_case_number("CN0008")).decodedResult
        
        assert.isTrue(works==true, 'human has not been added')
        assert.equal(human08.case_number,'CN0008','error human 9 not added')
    })  
    it('Add STR sample for human 08', async () => {  

        const system = {id:2,name:"STR"}
        const dna_analysis = { doneDate:"25.07.2020",
                                case_number:"CN0008",
                                snp_result:[],
                                str_result:[{name:"1",value1:3,value2:3},{name:"2",value1:3,value2:3},
                                {name:"3",value1:3,value2:3},{name:"4",value1:3,value2:3},{name:"5",value1:3,value2:3},
                                {name:"6",value1:3,value2:3},{name:"7",value1:3,value2:3},
                                {name:"8",value1:3,value2:3},{name:"9",value1:3,value2:3},{name:"10",value1:3,value2:3},
                                {name:"11",value1:3,value2:3},{name:"12",value1:3,value2:3},
                                {name:"13",value1:3,value2:3},{name:"14",value1:3,value2:3},{name:"15",value1:3,value2:3},
                                {name:"16",value1:3,value2:3},{name:"17",value1:3,value2:3},{name:"18",value1:3,value2:3},
                                {name:"19",value1:3,value2:3},{name:"20",value1:3,value2:3}]}
        const dna_Sample_to_add = { system:system,
                                    analysis:dna_analysis }
         
        let works = ( await instance.add_dna_sample(dna_Sample_to_add,"CN0008")).decodedResult
        let dna = (await instance.get_human_dna_by_case_number("CN0008")).decodedResult

        assert.equal(dna.case_number,'CN0008','dna sample has not been added')
    })  
             //human 9

             it('Add Human 9', async () => {  
        
                const personal_data_human = {case_number:"CN0009",
                                            document_id:"DI0009",
                                            registry_country:"UY", 
                                            identity_country:"UY", 
                                            name:"Nombre",
                                            last_name:"Apellido",
                                            address:"DIreccion de la persona",
                                            phone_number:"099892175",
                                            email:"correo@correo.com",
                                            contact:"datos de contacto extra"}
                
                const human_to_add = {case_number:"CN0009",personal_data:personal_data_human}
             
        
                let works = ( await instance.add_human("CN0009",human_to_add,personal_data_human)).decodedResult
                let human09 =  ( await instance.get_human_by_case_number("CN0009")).decodedResult
                
                assert.isTrue(works==true, 'human has not been added')
                assert.equal(human09.case_number,'CN0009','error human 9 not added')
            })  
            it('Add STR sample for human 09', async () => {  
    
                const system = {id:2,name:"STR"}
                const dna_analysis = { doneDate:"25.07.2020",
                                        case_number:"CN0009",
                                        snp_result:[],
                                        str_result:[{name:"1",value1:2,value2:2},{name:"2",value1:2,value2:2},
                                        {name:"3",value1:2,value2:2},{name:"4",value1:2,value2:2},{name:"5",value1:2,value2:2},
                                        {name:"6",value1:2,value2:2},{name:"7",value1:2,value2:2},
                                        {name:"8",value1:2,value2:2},{name:"9",value1:2,value2:2},{name:"10",value1:2,value2:2},
                                        {name:"11",value1:2,value2:2},{name:"12",value1:2,value2:2},
                                        {name:"13",value1:2,value2:2},{name:"14",value1:2,value2:2},{name:"15",value1:2,value2:2},
                                        {name:"16",value1:2,value2:2},{name:"17",value1:2,value2:2},{name:"18",value1:2,value2:2},
                                        {name:"19",value1:2,value2:2},{name:"20",value1:2,value2:2}]}
                const dna_Sample_to_add = { system:system,
                                            analysis:dna_analysis }
                 
                let works = ( await instance.add_dna_sample(dna_Sample_to_add,"CN0009")).decodedResult
                let dna = (await instance.get_human_dna_by_case_number("CN0009")).decodedResult

                assert.equal(dna.case_number,'CN0009','dna sample has not been added')
            })  
                //human 10

                it('Add Human 10', async () => {  
        
                    const personal_data_human = {case_number:"CN0010",
                                                document_id:"DI1210",
                                                registry_country:"UY", 
                                                identity_country:"UY", 
                                                name:"Nombre",
                                                last_name:"Apellido",
                                                address:"DIreccion de la persona",
                                                phone_number:"099892175",
                                                email:"correo@correo.com",
                                                contact:"datos de contacto extra"}
                    
                    const human_to_add = {case_number:"CN0010",personal_data:personal_data_human}
                 
            
                    let works = ( await instance.add_human("CN0010",human_to_add,personal_data_human)).decodedResult
                    let human10 =  ( await instance.get_human_by_case_number("CN0010")).decodedResult
                    
                    assert.isTrue(works==true, 'human has not been added')
                    assert.equal(human10.case_number,'CN0010','error human 10 not added')
                })
                it('Add STR sample for human 10', async () => {  
    
                    const system = {id:2,name:"STR"}
                    const dna_analysis = { doneDate:"25.07.2020",
                                            case_number:"CN0010",
                                            snp_result:[],
                                            str_result:[{name:"1",value1:1,value2:1},{name:"2",value1:1,value2:1},
                                            {name:"3",value1:1,value2:1},{name:"4",value1:1,value2:1},{name:"5",value1:1,value2:1},
                                            {name:"6",value1:1,value2:1},{name:"7",value1:1,value2:1},
                                            {name:"8",value1:1,value2:1},{name:"9",value1:1,value2:1},{name:"10",value1:1,value2:1},
                                            {name:"11",value1:1,value2:1},{name:"12",value1:1,value2:1},
                                            {name:"13",value1:1,value2:1},{name:"14",value1:1,value2:1},{name:"15",value1:1,value2:1},
                                            {name:"16",value1:1,value2:1},{name:"17",value1:1,value2:1},{name:"18",value1:1,value2:1},
                                            {name:"19",value1:1,value2:1},{name:"20",value1:1,value2:1}]}
                    const dna_Sample_to_add = { system:system,
                                                analysis:dna_analysis }
                     
                    let works = ( await instance.add_dna_sample(dna_Sample_to_add,"CN0010")).decodedResult
                    let dna = (await instance.get_human_dna_by_case_number("CN0010")).decodedResult

                    assert.equal(dna.case_number,'CN0010','dna sample has not been added')
                })
                it('Look for matching dna STR with human 10', async () => {  

                    const system = {id:2,name:"STR"}
                    const dna_analysis = { doneDate:"21.07.2020",
                                            case_number:"CND0010",
                                            snp_result:[],
                                            str_result:[
                                            {name:"1",value1:1,value2:1},{name:"2",value1:1,value2:1},{name:"3",value1:1,value2:1},
                                            {name:"4",value1:1,value2:1},{name:"5",value1:1,value2:1},
                                            {name:"6",value1:1,value2:1},{name:"7",value1:1,value2:1},{name:"8",value1:1,value2:1},
                                            {name:"9",value1:1,value2:1},{name:"10",value1:1,value2:1},
                                            {name:"11",value1:1,value2:1},{name:"12",value1:1,value2:1},{name:"13",value1:1,value2:1},
                                            {name:"14",value1:1,value2:1},{name:"15",value1:1,value2:1},
                                            {name:"16",value1:1,value2:1},{name:"17",value1:1,value2:1},{name:"18",value1:1,value2:1},
                                            {name:"19",value1:1,value2:1},{name:"20",value1:1,value2:1}]}

                    const dna_Sample_to_find = { system:system,
                                                analysis:dna_analysis }
                    
                    let dna=(await instance.get_human_dna_by_case_number('CN0010')).decodedResult
                    let works = ( await instance.look_for_match(dna_Sample_to_find)).decodedResult
                    console.log("Lista coincidencias " + works)
                    assert.equal(works[0].case_number,'CN0010','error looking for match')
                    
                    })
                it('Look for no matching dna STR with human 10', async () => {  
        
                    const system = {id:2,name:"STR"}
                    const dna_analysis = { doneDate:"21.07.2020",
                                            case_number:"CND0010",
                                            snp_result:[],
                                            str_result:[
                                            {name:"1",value1:10,value2:10},{name:"2",value1:10,value2:10},{name:"3",value1:1,value2:1},
                                            {name:"4",value1:1,value2:1},{name:"5",value1:1,value2:1},
                                            {name:"6",value1:1,value2:1},{name:"7",value1:1,value2:1},{name:"8",value1:1,value2:1},
                                            {name:"9",value1:1,value2:1},{name:"10",value1:1,value2:1},
                                            {name:"11",value1:1,value2:1},{name:"12",value1:1,value2:1},{name:"13",value1:1,value2:1},
                                            {name:"14",value1:1,value2:1},{name:"15",value1:1,value2:1},
                                            {name:"16",value1:1,value2:1},{name:"17",value1:1,value2:1},{name:"18",value1:1,value2:1},
                                            {name:"19",value1:10,value2:10},{name:"20",value1:10,value2:10}]}

                    const dna_Sample_to_find = { system:system,
                                                analysis:dna_analysis }
                    let works = ( await instance.look_for_match(dna_Sample_to_find)).decodedResult
                    console.log('lista '+works)
                    assert.isTrue(works[0]==undefined, 'error should no match')
                })
                it('Look for matching dna STR with human 10 on the edge', async () => {  
        
                    const system = {id:2,name:"STR"}
                    const dna_analysis = { doneDate:"21.07.2020",
                                            case_number:"CND0010",
                                            snp_result:[],
                                            str_result:[
                                            {name:"1",value1:1,value2:10},{name:"2",value1:10,value2:10},{name:"3",value1:1,value2:1},
                                            {name:"4",value1:1,value2:1},{name:"5",value1:1,value2:1},
                                            {name:"6",value1:1,value2:1},{name:"7",value1:1,value2:1},{name:"8",value1:1,value2:1},
                                            {name:"9",value1:1,value2:1},{name:"10",value1:1,value2:1},
                                            {name:"11",value1:1,value2:1},{name:"12",value1:1,value2:1},{name:"13",value1:1,value2:1},
                                            {name:"14",value1:1,value2:1},{name:"15",value1:1,value2:1},
                                            {name:"16",value1:1,value2:1},{name:"17",value1:1,value2:1},{name:"18",value1:1,value2:1},
                                            {name:"19",value1:10,value2:10},{name:"20",value1:10,value2:10}]}

                    const dna_Sample_to_find = { system:system,
                                                analysis:dna_analysis }
                    let works = ( await instance.look_for_match(dna_Sample_to_find)).decodedResult
                   
                    assert.equal(works[0].case_number,'CN0010','error looking for match')
                })
})