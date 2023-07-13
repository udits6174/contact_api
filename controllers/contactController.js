import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js"

//@desc Get all contacts
//@route GET api/contacts
//@access public
export const getContact = asyncHandler( async(req, res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})
//@desc Get a contact
//@route GET api/contacts/:id
//@access public
export const getContactById = asyncHandler( async(req, res)=>{
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})
//@desc Create a contact
//@route POST api/contacts
//@access public
export const createContact = asyncHandler( async(req, res)=>{
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, email, phone,
        user_id: req.user.id
    })
    res.status(201).json(contact);
})
//@desc Update a contact
//@route PUT api/contacts/:id
//@access public
export const updateContactById = asyncHandler( async(req, res)=>{
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.to_String() != req.user.id){
        res.status(403);
        throw new Error("User not permitted to update other contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body,{new: true})
    res.status(200).send(updatedContact);
})
//@desc delete a contact
//@route DELETE api/contacts/:id
//@access public
export const deleteContactById = asyncHandler( async(req, res)=>{
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.to_String() != req.user.id){
        res.status(403);
        throw new Error("User not permitted to update other contacts")
    }
    await Contact.findByIdAndDelete(id);
    res.status(200).send(contact);
})