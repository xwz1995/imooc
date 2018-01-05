export default {
    getList (params) {
        if(params.page === 1 || params.page === 2) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        {
                            name: '哈哈'
                        },
                        {
                            name: '不解释'
                        },
                        {
                            name: '哈哈'
                        },
                        {
                            name: '不解释'
                        },
                        {
                            name: '哈哈'
                        },
                        {
                            name: '不解释'
                        },
                        {
                            name: '哈哈'
                        },
                        {
                            name: '不解释'
                        },
                        {
                            name: '哈哈'
                        },
                        {
                            name: '不解释'
                        },
                    ])
                }, 500);
            });
        }
    }
}