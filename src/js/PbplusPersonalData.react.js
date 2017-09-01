// PbplusPersonalData.react.js
'use strict';
import React from 'react';
import InputUnit from './InputUnit.react.js';
import ImageInputBox from './ImageInputBox.react.js';
import '../css/pbplus-personal-data.less';

const DEFAULT_SIZE = 120;
const initedImage = new Image();
initedImage.crossOrigin = 'anonymous';
const defaultImageEditorState = {
    top: 0, left: 0, width: DEFAULT_SIZE, height: DEFAULT_SIZE,
    image: initedImage, resultSource: '',
};

class PbplusPersonalData extends React.Component {
    constructor(props) {
        super(props);
        this.imageType = /^image\//;
        this.selectFile = this.selectFile.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    selectFile(e) {
        const enableSelectFile = e.target.getAttribute('data-enable_select_file');
        if(!enableSelectFile) { return ;}
        const input = this.refs.fileSelector;
        if(input) {
            const event = new MouseEvent('click', {
                'view': window, 'bubbles': false, 'cancelable': true
            });
            input.dispatchEvent(event);
        }
    }
    onFileChange(e) {
        var files = e.target.files;
        if(files[0] && files[0].type && this.imageType.test(files[0].type)) {
            let url = URL.createObjectURL(files[0]);
            this.props.updateImageSource(url);
        }
    }
    render() {
        const {
            name = '陳阿寶', gender,
            birthYear, birthMonth, birthDay,
            country, mobile, mobileVerifyCode,
            email = 'abawchen123@gmail.com', zipcode, address
        } = this.props;
        return <div className='pbplus-personal-data'>
            <div className='pbplus-personal-data-photo'>
                <div className='pbplus-personal-data-photo-image-input-box-wrapper'>
                    <ImageInputBox editorState={defaultImageEditorState} selectFile={this.selectFile} />
                </div>
                <div className='pbplus-personal-data-photo-functions'>
                    <input
                        type='file' ref='fileSelector' className='file-input'
                        accept='image/*' multiple={false}
                        onChange={this.onFileChange} aria-label='file-selector'
                    />
                    <div
                        className='pbplus-personal-data-photo-select-file-button' role='button'
                        data-enable_select_file={true} onClick={this.selectFile}
                    >
                        上傳個人照
                        <div className='pbplus-personal-data-photo-edit-description'>
                            點一下圖片進行編輯
                        </div>
                    </div>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-name-wrapper'>
                    <InputUnit title='姓名' value={name} />
                </div>
                <div className='pbplus-personal-data-gender-wrapper'>
                    <div className='pbplus-personal-data-gender'>
                        <div className='pbplus-personal-data-gender-title'>性別</div>
                        <label>男<input type='radio' name='gender'/></label>
                        <label>女<input type='radio' name='gender'/></label>
                    </div>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-birthday-wrapper'>
                    <div className='pbplus-personal-data-birthday'>
                        <div className='pbplus-personal-data-birthday-title'>出生日期</div>
                        <div className='pbplus-personal-data-birthday-row'>
                            <label className='birthday-year'>
                                <input value={birthYear} title='年' type='number'/>
                                年
                            </label>
                            <label><input value={birthMonth} title='月' type='number'/>月</label>
                            <label><input value={birthDay} title='日' type='number'/>日</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-country-wrapper'>
                    <InputUnit title='國家' value={country} />
                </div>
                <div className='pbplus-personal-data-mobile-wrapper'>
                    <InputUnit
                        title='手機號碼' value={mobile}
                        inputProps={{
                            placeholder: '0912345678',
                            type: 'number'
                        }}
                    />
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-mobile-verify-code-wrapper'>
                    <InputUnit title='手機驗證碼' value={mobileVerifyCode} />
                </div>
                <div className='pbplus-personal-data-mobile-verify-code-button-wrapper'>
                    <div className='pbplus-personal-data-mobile-verify-code-button' role='button'>
                        發送驗證碼
                    </div>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-email-wrapper'>
                    <InputUnit title='Email' value={email} inputProps={{type: 'email'}}/>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-zipcode-wrapper'>
                    <InputUnit title='郵遞區號' value={zipcode} inputProps={{type: 'number'}}/>
                </div>
                <div className='pbplus-personal-data-address-wrapper'>
                    <InputUnit title='地址' value={address} />
                </div>
            </div>
            <div className='pbplus-personal-data-submit-button-wrapper'>
                <div className='pbplus-personal-data-submit-button' role='button'>
                    更新資料
                </div>
            </div>
        </div>;
    }
}

export default PbplusPersonalData;
