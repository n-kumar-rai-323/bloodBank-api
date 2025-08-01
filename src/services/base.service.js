class BaseService {
    #modelClass;
    constructor(_modelClass) {
        this.#modelClass = _modelClass
    }
    dataStore = async (data) => {
        try {
            const obj = new this.#modelClass(data)
            return await obj.save()
        } catch (exception) {
            throw exception
        }
    }


    getSingleRowByFilter = async (filter) => {
        try {
            return await this.#modelClass.findOne(filter)
        } catch (exception) {
            throw exception
        }
    }
    getAllRowsByFilter = async (filter = {}, query = {}) => {
        try {
            const allDataList = await this.#modelClass.find(filter);
            const count = await this.#modelClass.countDocuments(filter);
            return {
                data: allDataList,
                pagination: {
                    total: count,
                    page: 1,
                    pageSize: 10
                }
            }

        } catch (exception) {
            throw exception
        }
    }

    updateOneRowByFilter = async (filter, data) => {
        try {
            const update = await this.#modelClass.findOneAndUpdate(filter, { $set: data }, { new: true })
            return update

        } catch (exception) {
            throw exception
        }
    }
}

module.exports = BaseService