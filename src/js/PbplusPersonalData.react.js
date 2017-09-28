// PbplusPersonalData.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import InputUnit from './InputUnit.react.js';
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
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBirthYear = this.onChangeBirthYear.bind(this);
        this.onChangeBirthMonth = this.onChangeBirthMonth.bind(this);
        this.onChangeBirthDay = this.onChangeBirthDay.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeMobileVarifyCode = this.onChangeMobileVarifyCode.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
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
    onChangeName({ value }) { this.props.updateValue({newValueMap: {name: value}}); }
    onChangeGender(e) {
        const gender = e.target.getAttribute('data-gender');
        this.props.updateValue({newValueMap: { gender }});
    }
    onChangeBirthYear(e) { this.props.updateValue({newValueMap: {birthYear: e.target.value}}); }
    onChangeBirthMonth(e) { this.props.updateValue({newValueMap: {birthMonth: e.target.value}}); }
    onChangeBirthDay(e) { this.props.updateValue({newValueMap: {birthDay: e.target.value}}); }
    onChangeMobile({ value }) { this.props.updateValue({newValueMap: {mobile: value}}); }
    onChangeMobileVarifyCode({ value }) { this.props.updateValue({newValueMap: {mobileVerifyCode: value}}); }
    onChangeEmail({ value }) { this.props.updateValue({newValueMap: {email: value}}); }
    onChangeZipcode({ value }) { this.props.updateValue({newValueMap: {zipcode: value}}); }
    onChangeAddress({ value }) { this.props.updateValue({newValueMap: {address: value}}); }
    componentDidMount() { this.props.fetchPersonalData(); }
    render() {
        const {
            photo, name, gender,
            birthYear, birthMonth, birthDay,
            country, mobile, mobileVerifyCode,
            email, zipcode, address,
            imageInputBox, submit,
            submitResult
        } = this.props;
        const submitResultClassName = submitResult.isSuccess ? ' pbplus-success' : ' pbplus-error';
        return <div className='pbplus-personal-data'>
            <div className='pbplus-personal-data-photo'>
                <div className='pbplus-personal-data-photo-image-input-box-wrapper'>
                    {imageInputBox}
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
                    <InputUnit title='姓名' value={name} onChange={this.onChangeName} />
                </div>
                <div className='pbplus-personal-data-gender-wrapper'>
                    <div className='pbplus-personal-data-gender'>
                        <div className='pbplus-personal-data-gender-title'>性別</div>
                        <label>
                            男
                            <input
                                type='radio' name='gender' data-gender='1'
                                checked={'1' === gender} onChange={this.onChangeGender}
                            />
                        </label>
                        <label>
                            女
                            <input
                                type='radio' name='gender' data-gender='0'
                                checked={'0' === gender} onChange={this.onChangeGender}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-birthday-wrapper'>
                    <div className='pbplus-personal-data-birthday'>
                        <div className='pbplus-personal-data-birthday-title'>出生日期</div>
                        <div className='pbplus-personal-data-birthday-row'>
                            <label className='birthday-year'>
                                <input value={birthYear} title='年' type='number' onChange={this.onChangeBirthYear}/>
                                年
                            </label>
                            <label>
                                <input value={birthMonth} title='月' type='number' onChange={this.onChangeBirthMonth}/>
                                月
                            </label>
                            <label>
                                <input value={birthDay} title='日' type='number' onChange={this.onChangeBirthDay}/>
                                日
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-country-wrapper'>
                    <InputUnit title='國家' value={country} />
                </div>
                <div className='pbplus-personal-data-mobile-wrapper'>
                    <InputUnit
                        title='手機號碼' value={mobile} onChange={this.onChangeMobile}
                        inputProps={{placeholder: '0912345678', type: 'number'}}
                    />
                </div>
            </div>*/}
            {/*<div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-mobile-verify-code-wrapper'>
                    <InputUnit
                        title='手機驗證碼' value={mobileVerifyCode}
                        onChange={this.onChangeMobileVarifyCode}
                    />
                </div>
                <div className='pbplus-personal-data-mobile-verify-code-button-wrapper'>
                    <div className='pbplus-personal-data-mobile-verify-code-button' role='button'>
                        發送驗證碼
                    </div>
                </div>
            </div>*/}
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-email-wrapper'>
                    <InputUnit
                        title='Email' value={email} onChange={this.onChangeEmail}
                        inputProps={{type: 'email'}}
                    />
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-zipcode-wrapper'>
                    <InputUnit
                        title='郵遞區號' value={zipcode} onChange={this.onChangeZipcode}
                        inputProps={{type: 'number'}}
                    />
                </div>
                <div className='pbplus-personal-data-address-wrapper'>
                    <InputUnit title='地址' value={address} onChange={this.onChangeAddress} />
                </div>
            </div>
            <div className='pbplus-personal-data-submit-button-wrapper'>
                <div className='pbplus-personal-data-submit-result-wrapper' >
                    {undefined !== submitResult.isSuccess && <div
                        className={`pbplus-personal-data-submit-result${submitResultClassName}`}
                    >{submitResult.message}</div>}
                </div>
                <div
                    className='pbplus-personal-data-submit-button' role='button'
                    onClick={() => { submit({
                        photo, name, gender,
                        birthYear, birthMonth, birthDay,
                        country, mobile, mobileVerifyCode,
                        email, zipcode, address
                    }); }}
                >更新資料</div>
            </div>
        </div>;
    }
}

PbplusPersonalData.propTypes = {
    submitResult: PropTypes.object,
    updateValue: PropTypes.func.isRequired,
    imageInputBox: PropTypes.element.isRequired,
    updateImageSource: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    fetchPersonalData: PropTypes.func.isRequired,
};

export default PbplusPersonalData;
