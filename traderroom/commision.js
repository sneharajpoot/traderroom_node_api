const generateCommition = () => {


//     USE [traderroom_jarha]
// GO
// /****** Object:  Trigger [dbo].[tri_IBCommission]    Script Date: 03-12-2024 16:35:36 ******/
// SET ANSI_NULLS ON
// GO
// SET QUOTED_IDENTIFIER ON
// GO
// ALTER  TRIGGER [dbo].[tri_IBCommission] ON [dbo].[Trades]
// AFTER  insert   
// AS  
// BEGIN
// 	set NOCount on;
// 	declare @MT5Account int;  
// 	declare @Ticket int;  
// 	declare @Trader_Id int;  
// 	declare @Commission float;  
// 	declare @Commission_Amount float;  
// 	declare @Lot float;  
// 	declare @Commission_Code int;  
// 	declare @Reffered_By int;  
// 	declare @IBCommissionPlans int;  
// 	declare @Close_Time DateTime;
// 	--select Lot from Trades where Trdae_Id=10;
// 	select @MT5Account = MT5Account , @Ticket = Ticket ,@Trader_Id = Trader_Id , @Commission= - Commission , @Lot = Lot, @Close_Time = Close_Time  from inserted;
// 	--select @MT5Account = Trades.MT5Account , @Ticket = Trades.Ticket ,@Trader_Id = Trades.Trader_Id , @Commission= Trades.Commission, @Lot = Trades.Lot  from Trades where Trdae_Id=14;

// 	select @Trader_Id = Trader_Id , @IBCommissionPlans = IBCommissionPlans from  [dbo].[MT5_Profile_Account] where [Account] = @MT5Account;
// 	SELECT * INTO #CommitionPlan from [IB_Commission_Plan]  Where  Active=1  and Commission_Plan_Id = @IBCommissionPlans;
// 	SELECT @Commission_Code=Commission_Code , @Commission_Amount = Commission_Amount from #CommitionPlan 


// 	SET @Commission = @Commission_Amount * @Lot;


// 	if(@Commission!=0)
// 	BEGIN 

// 		SELECT * INTO #CommitionLvl from IB_Commission_Level Where Commission_Code=@Commission_Code Order by Level_No ASC
// 		Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
// 		declare @lvl int=0;

// 		while @Reffered_By!=0
// 		BEGIN
// 			SET @lvl+=1;
// 			Select @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Reffered_By;
// 		END

// 		if @lvl!=0
// 		BEGIN
// 			declare @Level1 float=0;
// 			declare @Level2 float=0;
// 			declare @Level3 float=0;
// 			declare @Level4 float=0;
// 			declare @Level5 float=0;
// 			declare @Level6 float=0;
// 			declare @Level7 float=0;
// 			declare @Level8 float=0;
// 			declare @Level9 float=0;
// 			declare @Level10 float=0;
// 			declare @cTrader_Id int ;
// 			--select * from #CommitionLvl

// 			Select @Level1=Level1 ,@Level2=Level2 ,@Level3=Level3 ,@Level4=Level4 ,@Level5=Level5 ,
// 			@Level6=Level6 ,@Level7=Level7 ,@Level8=Level8 ,@Level9=Level9 ,@Level10=Level10   from  #CommitionLvl where Level_No=@lvl
// 			Select @cTrader_Id=Trader_Id ,@Reffered_By=Reffered_By from Profiles Where Trader_Id=@Trader_Id;
// 			SET @lvl=0;

// 				while @Reffered_By!=0
// 				BEGIN
// 					SET @lvl+=1;
// 					Select @cTrader_Id=Trader_Id , @Reffered_By=Reffered_By from Profiles Where Trader_Id=@Reffered_By;
// 					declare @comm float=0;

// 					if @lvl=1
// 					BEGIN
// 						SET @comm=(@Level1 * @Commission/100);
// 					END
// 					if @lvl=2
// 					BEGIN
// 						SET @comm=(@Level2 * @Commission/100);
// 					END
// 					if @lvl=3
// 					BEGIN
// 						SET @comm=(@Level3 * @Commission/100);
// 					END
// 					if @lvl=4
// 					BEGIN
// 						SET @comm=@Level4 * @Commission/100;
// 					END
// 					if @lvl=5
// 					BEGIN
// 						SET @comm=@Level5 * @Commission/100;
// 					END
// 					if @lvl=6
// 					BEGIN
// 						SET @comm=@Level6 * @Commission/100;
// 					END
// 					if @lvl=7
// 					BEGIN
// 						SET @comm=@Level7 * @Commission/100;
// 					END
// 					if @lvl=8
// 					BEGIN
// 						SET @comm=@Level8 * @Commission/100;
// 					END
// 					if @lvl=9
// 					BEGIN
// 						SET @comm=@Level9 * @Commission/100;
// 					END
// 					if @lvl=10
// 					BEGIN
// 						SET @comm=@Level10 * @Commission/100;
// 					END

// 					if @comm != 0
// 					BEGIN
// 						INSERT INTO [IB_Commission] ([Trader_Id],[Commission],Levels,[Source],[SourceAccount],[DateTime],Ticket, TradeTime)
// 							VALUES (@cTrader_Id,@comm,@lvl,@Trader_Id,@MT5Account,(select GETDATE()),@Ticket, @Close_Time);
// 					END
// 				END

// 			END

// 		drop table #CommitionLvl;

// 	END
// 	drop table #CommitionPlan;

// END




}