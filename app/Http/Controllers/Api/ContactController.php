<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ContactController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request): JsonResponse
    {
        $contact = Contact::create($request->validated());

        return response()->json([
           'message'=>'votre message a été envoyé avec succès',
           'contact' => $contact
        ], 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'message' => 'Contact supprimé avec succès'
        ]);
    }
}
