import React from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_REWARD, DELETE_REWARD } from '../../utils/mutations';

    const RewardCard = ({ reward, onDelete, showDeleteButton = true }) => {
        const [confirmRewardComplete] = useMutation(CONFIRM_REWARD);
        const [deleteReward] = useMutation(DELETE_REWARD);
      
        const handleRedeemClick = async () => {
          if (window.confirm(`Are you sure you want to redeem the reward "${reward.name}"?`)) {
            try {
              await confirmRewardComplete({ variables: { rewardId: reward._id } });
              
            } catch (err) {
              console.error('Error redeeming reward:', err);
            }
          }
        };
      
        const handleDeleteClick = async () => {
          if (window.confirm(`Are you sure you want to delete the reward "${reward.name}"? This action cannot be undone.`)) {
            try {
              await deleteReward({ variables: { rewardId: reward._id } });
              onDelete(reward);
              window.location.reload();
            } catch (err) {
              console.error('Error deleting reward:', err);
            }
          }
        };

 

        return (
          <div className="item-bought card min-h-[325px] max-h-[325px]">
            <div className="card-body reward-sign items-center justify-center permanent-marker-regular reward-text">
              <div>
                <h2 className="text-3xl text-center pt-14">{reward.name}</h2>
                <div className='reward-description-div mt-2 ml-3'>
                  <p className='max-w-[270px] text-wrap text-xl max-h-[50px] font-bold min-h-[60px]'>{reward.description}</p>
                </div>
              </div>

              <div className="self-center ">
                <button className="" onClick={handleRedeemClick}>
                  <p className='mr-2 reward-cost flex flex-row items-center justify-center'>
                    Cost: {reward.cost}
                    <img src='/assets/coin.gif' className='w-[40px]'/>
                  </p>
                </button>
                {showDeleteButton && (
                  <button className="btn btn-error  mt-5" onClick={handleDeleteClick}>
                    Delete!
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      };




export default RewardCard;