import House from "../models/House";
import User from "../models/User";
class HouseController {
    
    async index(req, res){
        const {status} = req.query;
        const houses = await House.find({status: status});

        return res.json(houses);
    }
    async store(req, res){
        console.log(req.headers);
        console.log(req.body);
        console.log(req.file)

        const {description, price, status, location} = req.body;
        const {filename} = req.file
        const {user_id} = req.body;

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
        console.log(String(user._id))
        console.log(String(house.user))

        if(String(user._id) !== String(house.user)){
            console.log("Usuário não autorizado");
            return res.json({error: "Não autorizado"});
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
}

export default new HouseController();