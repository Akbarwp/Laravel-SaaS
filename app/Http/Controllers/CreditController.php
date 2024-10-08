<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Midtrans\Config;
use Midtrans\Snap;

class CreditController extends Controller
{
    public function __construct()
    {
        // Set your Merchant Server Key
        Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
        // Set your Merchant Server Key
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        Config::$isProduction = false;
        // Set sanitization on (default)
        Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        Config::$is3ds = true;
    }

    public function index()
    {
        $packages = Package::all();
        $features = Feature::where('active', true)->get();
        return inertia('Credit/Index', [
            'packages' => $packages,
            'features' => $features,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function buyCredits(Package $package)
    {
        $user = Auth::user();
        $params = [
            'transaction_details' => [
                'order_id' => 'order-' . Carbon::now()->format('His-dmY'),
                'gross_amount' => $package->price,
            ],
            'customer_details' => array(
                'first_name' => $user->name,
                'last_name' => $user->name,
                'email' => $user->email,
            ),
            'credit_card' => [
                'secure' => true,
            ],
        ];
        try {
            // Get Snap Payment Page URL
            $paymentUrl = Snap::createTransaction($params)->redirect_url;

            Transaction::create([
                'status' => 'pending',
                'price' => $package->price,
                'credits' => $package->credits,
                'session_id' => $params['order_id'],
                'user_id' => Auth::id(),
                'packages_id' => $package->id,
            ]);

            // Redirect to Snap Payment Page
            header('Location: ' . $paymentUrl);
        } catch (Exception $e) {
            return $this->cancel($e->getMessage());
        }
    }

    public function success()
    {
        return to_route('credit.index')->with('success', 'Credits purchased successfully.');
    }

    public function cancel($message = null)
    {
        return to_route('credit.index')->with('error', $message ?? 'There was an error purchasing credits.');
    }
}
