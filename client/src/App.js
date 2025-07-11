import "./App.css";
import React from "react";

function App() {
    const [step, setStep] = React.useState(1);
    const [form, setForm] = React.useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    const formProps = { form, setForm, setStep };

    return (
        <div>
            <h1 className="title">Apply For Aid</h1>
            <div className="main-container">
                {step === 1 && <GuardianInfo {...formProps} />}
                {step === 2 && <PatientInfo {...formProps} />}
                {step === 3 && <IncomeInfo {...formProps} />}
                {step === 4 && <SocialWorkerInfo {...formProps} />}
            </div>
        </div>
    );
}

function Input({ label, id, type = "text", value, onChange, placeholder }) {
    return (
        <div className="input-container">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input"
            />
        </div>
    );
}

function Button({ children, type, onClick }) {
    return (
        <button className={`button ${type}`} onClick={onClick}>
            {children}
        </button>
    );
}

function GuardianInfo({ form, setForm, setStep }) {
    const onChangeName = (e) => {
        setForm({ ...form, name: e.target.value });
    };

    const onChangeAddress = (e) => {
        setForm({ ...form, address: e.target.value });
    };

    const onClickNext = () => {
        console.log("hit next");
        setStep(2);
    };

    return (
        <div className="form-container">
            <h2 className="title">Parent/Legal Guardian Information (1/4)</h2>
            <Input label="Name" value={form.name} onChange={onChangeName} />
            <Input
                label="Address"
                value={form.address}
                onChange={onChangeAddress}
            />
            <div className="input-row">
                <Input label="City" />
                <Input label="State" />
                <Input label="Zip" />
            </div>
            <div className="input-row">
                <Input label="Phone" />
                <Input label="Cell Phone" />
            </div>
            <Input label="Email" />
            <Button type="next" onClick={onClickNext}>
                Next Page
            </Button>
        </div>
    );
}

function PatientInfo({ form, setForm, setStep }) {
    const onClickNext = () => {
        setStep(3);
    };

    const onClickPrevious = () => {
        setStep(1);
    };

    return (
        <div className="form-container">
            <h2 className="title">Child/Patient Information (2/4)</h2>
            <div className="input-row">
                <Input label="Child's Name" />
                <Input label="Age" />
                <Input label="Gender" />
            </div>
            <Input label="Ethnicity" />
            <p className="subtext">
                Information will be used for statistical purposes only and will
                not affect eligibilty.
            </p>
            <div className="input-row">
                <Button type="previous" onClick={onClickPrevious}>
                    Previous Page
                </Button>
                <Button type="next" onClick={onClickNext}>
                    Next Page
                </Button>
            </div>
        </div>
    );
}

function IncomeInfo({ form, setForm, setStep }) {
    const onClickNext = () => {
        setStep(4);
    };

    const onClickPrevious = () => {
        setStep(2);
    };

    return (
        <div className="form-container">
            <h2 className="title">Income and Bills Information (3/4)</h2>
            <Input label="Annual Income ($)" />
            <p className="subtext">
                i.e. government assistance, child support, alimony, family
                assistance, all sources of income to pay living expenses
            </p>
            <Input label="Request Grant Amount ($)" />
            <div className="input-row">
                <Input label="Vendor Name" />
                <Input label="Dollar Amount on Bill ($)" />
            </div>
            <div className="input-row">
                <Input label="Family Name on Bill" />
                <Input label="Dollar Amount on Bill ($)" />
            </div>
            <Input label="Vendor Mailing Address" />
            <div className="input-row">
                <Input label="City" />
                <Input label="State" />
                <Input label="Zip" />
            </div>
            <div className="input-row">
                <Button type="previous" onClick={onClickPrevious}>
                    Previous Page
                </Button>
                <Button type="next" onClick={onClickNext}>
                    Next Page
                </Button>
            </div>
        </div>
    );
}

function SocialWorkerInfo({ form, setForm, setStep }) {
    const onClickNext = () => {};

    const onClickPrevious = () => {
        setStep(3);
    };

    return (
        <div className="form-container">
            <h2 className="title">Social Worker Information (4/4)</h2>
            <Input label="Social Worker Name" />
            <Input label="Social Worker Email" />
            <Input label="Confirm Social Worker Email" />
            <p className="subtext">
                On the following page in the attachments box, please provide
                bills paid directly to the vendor with the vendor name, account
                number, mailing address, family's last name, and dollar amount
                owed. There will also be space to attach an optional photo.
            </p>
            <div className="input-row">
                <Button type="previous" onClick={onClickPrevious}>
                    Previous Page
                </Button>
                <Button type="next" onClick={onClickNext}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default App;
