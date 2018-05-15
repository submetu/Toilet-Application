import availableImage from '../Images/available.png';
import occupiedImage from '../Images/occupied.png';
import outOfOrderImage from '../Images/outOfOrder.gif';

import {available,occupied,outOfOrder} from './constants';

const ToiletImageModel = {

    [available]: availableImage,
    [occupied]: occupiedImage,
    [outOfOrder]: outOfOrderImage

}
export default ToiletImageModel;