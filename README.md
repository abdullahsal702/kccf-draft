Created as a draft for the KCCF aid form. This project aims to replicate the aid application flow from https://b-signature.org/family-form.

## B-Signature Flow
Starting at https://b-signature.org/ the user is directed to a 4 page form where they fill out information about the patient, their income, and provide a social worker's email. 

Upon submitting the form the user begins a Docusign embedded signing session. as shown in the image below.

<img width="537" height="603" alt="Screenshot 2025-07-11 at 11 20 36 AM" src="https://github.com/user-attachments/assets/be5179c2-779a-45d8-a64b-67daf2f5d8d8" />

The fields are populated with the user's provided information and user can edit them. The document asks for supporting documents and e-signatures. 

Upon submitting the signature, the user is directed back to a completion page and the social worker receives an email. 

<img width="1436" height="711" alt="Screenshot 2025-07-11 at 11 22 49 AM" src="https://github.com/user-attachments/assets/4383e084-d9fd-4a81-8624-a5ccba38b745" />

<img width="1190" height="653" alt="Screenshot 2025-07-11 at 11 23 37 AM" src="https://github.com/user-attachments/assets/1858b9f5-68b9-4c81-9f1b-f1a1c7f0667d" />

The social worker is directed to a Docusign remote signing session where they view the applicants info (uneditable) then fill out their portion of the form.  

<img width="637" height="600" alt="Screenshot 2025-07-11 at 11 24 32 AM" src="https://github.com/user-attachments/assets/5a355ce3-c335-424d-8e70-2002e6c1e34a" />

<img width="449" height="532" alt="Screenshot 2025-07-11 at 11 27 18 AM" src="https://github.com/user-attachments/assets/bd03321f-6c3a-4a5d-8d45-17778e44cda0" />

Upon submission the info is saved to the organizations Docusign account.

## Frontend Notes

This draft was a quick imitation of what B-Signature had for their form created with CRA. Ideally use a lighter weight tool like Vite for setup. B-Signature has little to no error checks, which should be implemented for this form. 

## Docusign Implmentation Notes

Use the Docusign E-Signature API to create embedded and remote signing sessions for the applicant and social worker. You can find the docs here https://developers.docusign.com/docs/esign-rest-api/.

1) Authenticate with Confidential Authorization Code Grant to get access token for API use: https://developers.docusign.com/platform/auth/confidential-authcode-get-token/
2) Create an envelope with documents, tabs, and recipients. Use this to create an embedded signing session: https://developers.docusign.com/docs/esign-rest-api/how-to/request-signature-in-app-embedded/
  - Prior to doing this an application form is needed. Add anchor tags in the PDF to make adding tabs with Docusign easier: https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/tabs/
  - Since two parties need to sign, a routing order must be specified: https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/recipients/
3) Create a remote signing sessoin for the social worker: https://developers.docusign.com/docs/esign-rest-api/how-to/request-signature-email-remote/
4) Customize the email sent out for signatures: https://developers.docusign.com/docs/esign-rest-api/esign101/concepts/branding/

## Production

This form will act as a standalone app that exists on a subdomain of https://thekccf.org/ like https://aid.thekccf.org/. 
