import House from "../models/House";
import User from "../models/User";
class HouseController {
    
    async index(req, res){
        const {status} = req.query;
        const houses = await House.find({status: status});

        return res.json(houses);
    }
    async store(req, res){

        const {description, price, status, location} = req.body;
        const {filename} = req.file
        const {user_id} = req.headers;

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
        const {filename} = req.file
        const {id_house} = req.params;
        const {description, price, status, location} = req.body;
        const {user_id} = req.headers;

 
        const user = await User.findById(user_id);
        const house = await House.findById(id_house);
       
        if(String(user._id) !== String(house.user)){
            console.log("Usuário não autorizado");
            return res.status(404).json({error: "Não autorizado"});
        }

        const houses = await House.updateOne({_id: id_house}, {
            user: user_id,
            thumbnail: filename,
            description: description,
            price: price,
            location: location,
            status: status
        });

        return res.send(house);
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