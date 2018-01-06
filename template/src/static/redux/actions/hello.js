import ActionType from '../constants/ActionType';

export function getHelloContent(content) {
    return function (dispatch) {
        dispatch({
            type: ActionType.GET_HELLO,
            data: content
        });
    };
}
