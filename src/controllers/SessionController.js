import User from "../models/User";

class SessionController {
    async store(req, res){
        /* console.log(req.body.email) */
        const { email } = req.body
        
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({email: email});
        }
        
        return res.json({message: 'Usuario criado com sucesso', user: {
            _id: user.id,
            email: user.email
        }})
    }
}

export default new SessionController();