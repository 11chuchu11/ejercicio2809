const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {
    const {Musicos,Sesiones} = this.entities

    this.before(['CREATE','UPDATE'], Sesiones, (req) => {
        if(req.data.horas > 6) {
            req.data.horas+=2
            req.data.promocion = true
        }

    })

    this.on('AddMusicians', async ({data:{musicos}})=>{
        console.log("llega")
        const  response = await INSERT.into(Musicos).entries(...musicos)
        console.log(response.results)
        return true
    })

    this.on('DeleteMusicians', async ({data:{ids}}) => {
        let resp = false
        try{
            const response = await DELETE.from(Musicos).where({ID:ids})
            resp = true
        }
        catch(error){
            console.error(error)
        }
        return resp
    })

    this.on('GetMusician', async ({data:{ID}})=> await SELECT.from(Musicos).where({ID}))
})