import House from "../models/House";

class HouseController {
    async store(req, res){
        console.log(req.headers);
        console.log(req.body);
        console.log(req.file)

        const {description, price, status, location} = req.body;
        const {filename} = req.file
        const {user_id} = req.body;
        console.log(filename)

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
}

export default new HouseController();