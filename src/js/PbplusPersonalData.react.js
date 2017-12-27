// PbplusPersonalData.react.js
'use strict';
import PropTypes from 'prop-types';
import React from 'react';
import MemberInputUnit from './MemberInputUnit.react.js';
import MemberMobileInputUnit from './MemberMobileInputUnit.react.js';
import '../css/pbplus-personal-data.less';

import MockUserPhoto from '../img/mock_user_photo.jpg';

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
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeBirthYear = this.onChangeBirthYear.bind(this);
        this.onChangeBirthMonth = this.onChangeBirthMonth.bind(this);
        this.onChangeBirthDay = this.onChangeBirthDay.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeMobileVarifyCode = this.onChangeMobileVarifyCode.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
    }
    selectFile(e) {
        const enableSelectFile = e.target.getAttribute('data-enable_select_file');
        if(!enableSelectFile) { return ;}
        const input = this.fileSelector;
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
    onChangeNickname({ value }) { this.props.updateValue({newValueMap: {nickname: value}}); }
    onChangeName({ value }) { this.props.updateValue({newValueMap: {name: value}}); }
    onChangeGender(e) {
        const gender = e.target.getAttribute('data-gender');
        this.props.updateValue({newValueMap: { gender }});
    }
    onChangeBirthYear(e) { this.props.updateValue({newValueMap: {birthYear: e.target.value}}); }
    onChangeBirthMonth(e) { this.props.updateValue({newValueMap: {birthMonth: e.target.value}}); }
    onChangeBirthDay(e) { this.props.updateValue({newValueMap: {birthDay: e.target.value}}); }
    onChangeCountry({ value }) { this.props.updateValue({newValueMap: {country: value}}); }
    onChangeMobile({ mobile, country }) { this.props.updateValue({newValueMap: { mobile, country }}); }
    onChangeMobileVarifyCode({ value }) { this.props.updateValue({newValueMap: {mobileVerifyCode: value}}); }
    onChangeEmail({ value }) { this.props.updateValue({newValueMap: {email: value}}); }
    onChangeZipcode({ value }) { this.props.updateValue({newValueMap: {zipcode: value}}); }
    onChangeAddress({ value }) { this.props.updateValue({newValueMap: {address: value}}); }
    componentDidMount() { this.props.fetchPersonalData(); }
    render() {
        const {
            photo,
            nickname, name, gender,
            birthYear, birthMonth, birthDay,
            country, mobile, mobileVerifyCode,
            isMobileValidated, isMobileVerifyCodeSent,
            email, isEmailValidated,
            zipcode, address,
            imageInputBox, submit,
            validateEmail, sendValidateMobileMessage, submitMobileVerifyCode,
            submitResult
        } = this.props;
        const shouldDisplaySendValidateMessageButton = (country && mobile) && !isMobileValidated;
        const submitResultClassName = submitResult.isSuccess ? ' pbplus-success' : ' pbplus-error';
        return <div className='pbplus-personal-data'>
            <div className='pbplus-personal-data-photo'>
                <div className='pbplus-personal-data-photo-image-input-box-wrapper'>
                    {imageInputBox}
                </div>
                <div className='pbplus-personal-data-photo-functions'>
                    <input
                        type='file' className='file-input'
                        ref={fileSelector => this.fileSelector = fileSelector}
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
                <div className='pbplus-personal-data-nickname-wrapper'>
                    <MemberInputUnit title='暱稱' value={nickname} onChange={this.onChangeNickname} />
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-name-wrapper'>
                    <MemberInputUnit title='姓名' value={name} onChange={this.onChangeName} />
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
                                <span className='input'>
                                    <input value={birthYear} title='年' type='number' onChange={this.onChangeBirthYear}/>
                                </span>
                                <span className='label'>年</span>
                            </label>
                            <label>
                                <span className='input'>
                                    <input value={birthMonth} title='月' type='number' onChange={this.onChangeBirthMonth}/>
                                </span>
                                <span className='label'>月</span>
                            </label>
                            <label>
                                <span className='input'>
                                    <input value={birthDay} title='日' type='number' onChange={this.onChangeBirthDay}/>
                                </span>
                                <span className='label'>日</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-mobile-wrapper'>
                    <MemberMobileInputUnit
                        title='手機' mobile={mobile} country={country} onChange={this.onChangeMobile}
                        isLocked={isMobileValidated} lockedInfo='手機已驗證，無法進行修改'
                    />
                </div>
                {shouldDisplaySendValidateMessageButton && <div className='pbplus-personal-data-mobile-verify-message-button-wrapper'>
                    <div
                        className='pbplus-personal-data-mobile-verify-message-button' role='button'
                        onClick={() => { sendValidateMobileMessage({ country, mobile }); }}
                    >
                        發送驗證碼
                    </div>
                </div>}
            </div>
            {isMobileVerifyCodeSent && <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-mobile-verify-code-wrapper'>
                    <MemberInputUnit
                        title='已傳送驗證碼至您的手機，十分鐘後才能再次傳送'
                        value={mobileVerifyCode} inputProps={{placeholder: '請輸入驗證碼'}}
                        onChange={this.onChangeMobileVarifyCode}
                    />
                </div>
                <div className='pbplus-personal-data-mobile-verify-code-button-wrapper'>
                    <div
                        className='pbplus-personal-data-mobile-verify-code-button' role='button'
                        onClick={() => { submitMobileVerifyCode({ mobileVerifyCode }); }}
                    >
                        驗證
                    </div>
                </div>
            </div>}
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-email-wrapper'>
                    <MemberInputUnit
                        title='Email' value={email} onChange={this.onChangeEmail}
                        inputProps={{type: 'email'}}
                        isLocked={isEmailValidated} lockedInfo='Email 已驗證，無法進行修改'
                    />
                </div>
                {!isEmailValidated && <div className='pbplus-personal-data-email-validation-button-wrapper'>
                    <div
                        className='pbplus-personal-data-email-validation-button' role='button'
                        onClick={() => { validateEmail({ email }); }}
                    >驗證 Email</div>
                </div>}
            </div>
            <div className='pbplus-personal-data-row'>
                <div className='pbplus-personal-data-zipcode-wrapper'>
                    <MemberInputUnit
                        title='郵遞區號' value={zipcode} onChange={this.onChangeZipcode}
                        inputProps={{type: 'number'}}
                    />
                </div>
                <div className='pbplus-personal-data-address-wrapper'>
                    <MemberInputUnit title='地址' value={address} onChange={this.onChangeAddress} />
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
                        photo: photo || MockUserPhoto,
                        nickname, name, gender,
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
    sendValidateMobileMessage: PropTypes.func.isRequired,
    submitMobileVerifyCode: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    fetchPersonalData: PropTypes.func.isRequired,
};

export default PbplusPersonalData;
