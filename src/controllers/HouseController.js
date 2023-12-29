import House from "../models/House";
import User from "../models/User";
import * as yup from 'yup'; 
class HouseController {
    
    async index(req, res){
        const {status} = req.query;
        const houses = await House.find({status: status});

        return res.json(houses);
    }
    async store(req, res){
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            status: yup.boolean().required(),
            location: yup.string().required()
        });
        const {description, price, status, location} = req.body;
        const {filename} = req.file
        const {user_id} = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'falha na validaçao'})
        }
        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description: description,
            price: price,
            location: location,
            status: status

        });
        return res.json(house);
    }

    async update(req, res) {
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            status: yup.boolean().required(),
            location: yup.string().required()
        });
        const {filename} = req.file
        const {id_house} = req.params;
        const {description, price, status, location} = req.body;
        const {user_id} = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'falha na validaçao'})
        }
 
        const user = await User.findById(user_id);
        const house = await House.findById(id_house);
       
        if(String(user._id) !== String(house.user)){
            console.log("Usuário não autorizado");
            return res.status(404).json({error: "Não autorizado"});
        }

        await House.updateOne({_id: id_house}, {
            user: user_id,
            thumbnail: filename,
            description: description,
            price: price,
            location: location,
            status: status
        });
        const houseEdit = await House.findById(id_house);
        return res.json(houseEdit);
    }

    async destroy(req, res){
        const {id_house} = req.params;
        const {id_user} = req.headers;
        console.log(id_user)
        console.log(id_house)

        const user = await User.findById(id_user);
        const house = await House.findById(id_house);

        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        if(String(user._id) !== String(house.user)){
            console.log("Usuário não autorizadoo");
            return res.status(404).json({error: "Não autorizado"});
        }

        await House.findByIdAndDelete({_id: id_house})

        return res.json({message: "deletado com sucesso!"})
    }
}

export default new HouseController();