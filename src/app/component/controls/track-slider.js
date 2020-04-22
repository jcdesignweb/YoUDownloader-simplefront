import $ from 'jquery';

let inputElement;
class TrackSlider {

    /**
     * 
     * @param {DomElement} sliderElement 
     * @param {Function} onChange 
     */
    constructor(sliderElement, onChange) {

        inputElement = $(sliderElement).find('input');
        $(inputElement).on('input', () =>{
            onChange($(inputElement).val());
        });

    }

    updateTrack(val) {
        const bg = 'linear-gradient(to right, #fff 0%, #fff ' + val + '%, #606268  ' + val + '%, #606268 80%)';
        $(inputElement).val(val);
        $(inputElement).css('background', bg);

        console.log("VAL", val);

        $(inputElement).attr('disabled', false);
    }

    reset() {
        $(inputElement).attr('disabled', true);
    }

}

export default TrackSlider;