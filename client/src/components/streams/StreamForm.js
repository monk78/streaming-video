import React from 'react';
import { Field,reduxForm } from 'redux-form';

class StreamForm extends React.Component{
   
    renderError({error,touched}){
     if(touched && error){
         return(
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
         );
     }
    }

    renderInput=({input,label,meta})=>{
        //console.log(meta);
        return(
            <div className="field">
                <label>{label}</label>
         <input {...input} />
         {this.renderError(meta)}
         </div>
        );
    };
    onSubmit = formvalues => {
        this.props.onSubmit(formvalues);
    };

    render(){
    return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
         name="description"
         component={this.renderInput}
         label="Enter Description" 
           />
           <button className="ui button primary">Submit </button>
        </form>
    );
    } 
}
const validate=formvalues => {
const error={};
  if(!formvalues.title){
     error.title='You must enter a title';
  }
  if(!formvalues.description){
      error.description="You must enter a description";
  }
  return error;
};

export default reduxForm({
    form : 'streamForm',
    validate:validate
})(StreamForm);