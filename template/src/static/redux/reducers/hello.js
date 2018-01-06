import ActionType from '../constants/ActionType';
const defState = {
    content: ''
};

export default function (state = defState, action) {
    let newState = null;
    switch (action.type) {
        case ActionType.GET_HELLO:
            newState = {
                content: action.data
            };
            break;
        default:
            newState = state;
    }
    return newState;
}
