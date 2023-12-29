import User from "../models/User";
import * as yup from 'yup';

class SessionController {
    async store(req, res){
        const schema = yup.object().shape({
            email: yup.string().required().email(),
        });
        const { email } = req.body
        
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'email obrigatorio'})
        }
        
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