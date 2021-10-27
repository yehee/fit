import { createState } from '@hookstate/core'

const store = createState({
    routines: {},
    logs: [],
    user: {
        name: 'Alice',
        email: 'alice@gmail.com',
    },
})

export default store
