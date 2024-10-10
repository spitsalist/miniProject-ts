import { User } from "../models/user";

export const createUser = async (req: any, res: any) => {
  try {
    const { initialBalance } = req.body;

    if (!initialBalance || typeof initialBalance !== 'number' || initialBalance < 0) {
      return res.status(400).json({ message: 'Invalid initial balance. It must be a positive number.' });
    }

    const user = new User({
      initialBalance,
      currentBalance: initialBalance,  
      transactions: [] 
    });

    await user.save();
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        initialBalance: user.initialBalance,
        currentBalance: user.currentBalance,
        transactions: user.transactions
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
};


export const addTransaction = async (req:any, res:any) => {
  try {
    const { userId } = req.params;
    const { type, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transaction = {
      type,
      amount,
      date: new Date(),
    };

    if (type === "income") {
      user.currentBalance += amount;
    } else if (type === "expense") {
      user.currentBalance -= amount;
    }

    user.transactions.push(transaction);

    await user.save();

    return res
      .status(200)
      .json({ message: "Transaction added successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error adding transaction", error });
  }
};

export const getTransactions = async (req:any, res:any) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.transactions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching transactions", error });
  }
};

export const deleteUser = async(req:any, res:any) => {
  try{
    const {userId} = req.params
    const userDelete = await User.findByIdAndDelete(userId)
    if(!userDelete) {
      return res.status(404).json({message: 'User delete succesfully'})
    }
    return res.status(200).json(userDelete)
  }catch(error){
    res.status.json({message:"Error deleting User"})
  }
}
