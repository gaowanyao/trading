<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 16-3-8
 * Time: 下午4:29
 */

namespace Home\Controller;

use Common\Controller\CommonController;

class ModifyMemberController extends CommonController {
    /**
     * 添加个人信息
     */
    public function modify(){
        //判断是否是已经完成reg基本注册
       $login=$this->checkLogin();
       if(!$login){
      	 	$this->redirect('User/index');
       		return;
       }
       if(session('STATUS')!=0){
            $this->redirect('User/index');
            return;
        }
        if(IS_POST){
            $M_member = D('Member');
            $id = session('USER_KEY_ID');
            $_POST['member_id']=$id;
            $_POST['status'] = 1;//0=有效但未填写个人信息1=有效并且填写完个人信息2=禁用
            if (!$data=$M_member->create()){ // 创建数据对象
                // 如果创建失败 表示验证没有通过 输出错误提示信息
                $data['status'] = 0;
                $data['info'] = $M_member->getError();
                $this->ajaxReturn($data);
//                $this->error($M_member->getError());
                return;
            }else {
                $where['member_id'] = $id;
                $r = $M_member->where($where)->save();
                if($r){
                    session('procedure',2);//SESSION 跟踪第二步
                    session('STATUS',1);
                    $data['status'] = 1;
                    $data['info'] = "提交成功";
                    $this->ajaxReturn($data);
//                    $this->redirect('Reg/regSuccess');
                }else{
                    $data['status'] = 0;
                    $data['info'] = '服务器繁忙,请稍后重试';
                    $this->ajaxReturn($data);
//                    $this->error('服务器繁忙,请稍后重试');
//                    return;
                }
            }
        }else{
            $this->display();
        }
    }
    /**
     * ajax验证昵称是否存在
     */
    public function ajaxCheckNick($nick){
        $nick = urldecode($nick);
        $data =array();
        $M_member = M('Member');
        $where['nick']  = $nick;
        $r = $M_member->where($where)->find();
        if($r){
            $data['msg'] = "昵称已被占用";
            $data['status'] = 0;
        }else{
            $data['msg'] = "";
            $data['status'] = 1;
        }
        $this->ajaxReturn($data);
    }
    /**
     * ajax手机验证
     */
    function ajaxCheckPhone($phone) {
        $phone = urldecode($phone);
        $data = array();
        if(!checkMobile($phone)){
            $data['msg'] = "手机号不正确！";
            $data['status'] = 0;
        }else{
            $M_member = M('Member');
            $where['phone']  = $phone;
            $r = $M_member->where($where)->find();
            if($r){
                $data['msg'] = "此手机已经绑定过！请更换手机号";
                $data['status'] = 0;
            }else{
                $data['msg'] = "";
                $data['status'] = 1;
            }
        }
        $this->ajaxReturn($data);
    }

    /**
     * ajax验证手机验证码
     */
    public function ajaxSandPhone(){
        $phone = urldecode(I('phone'));
        if(empty($phone)){
            $data['status']=0;
            $data['info'] = "手机号码不能为空";
            $this->ajaxReturn($data);
        }
        if(!preg_match("/^1[34578]{1}\d{9}$/",$phone)){  
            $data['status']=-1;
            $data['info'] = "手机号码不正确";
            $this->ajaxReturn($data);
        }  
        $user_phone=M("Member")->field('phone')->where("phone='$phone'")->find();
        if (!empty($user_phone)){
            $data['status']=-2;
            $data['info'] = "手机号码已经存在";
            $this->ajaxReturn($data);
        }
        $r = sandPhone1($phone,$this->config['CODE_NAME'],$this->config['CODE_USER_NAME'],$this->config['CODE_USER_PASS']);
//        $r = sandPhone($phone,$this->config['CODE_NAME'],$this->config['CODE_USER_NAME'],$this->config['CODE_USER_PASS']);


//        if(!$r[1]){
//			$data['status']=1;
//        	$data['info']="发送成功";
//        	$this->ajaxReturn($data);exit;
//		}else{
//			$data['status'] =-3;
//        	$data['info'] = chuanglan_status($r[1]);
//        	$this->ajaxReturn($data);exit;
//		}
 
        
         if($r!="短信发送成功"){
             $data['status']=0;
             $data['info'] = $r;
             $this->ajaxReturn($data);
         }else{
             $data['status']=1;
             $data['info'] = $r;
             $this->ajaxReturn($data);
         }
    }




    //ceshi
    public function kk(){





        $_SESSION['num'] = 0;
        dump($_SESSION);


















//        $r = sandPhone($phone,$this->config['CODE_NAME'],$this->config['CODE_USER_NAME'],$this->config['CODE_USER_PASS']);


//        dump($r);
//        dump($_SESSION);

//
//        $statusStr = array(
//            "0" => "短信发送成功",
//            "-1" => "参数不全",
//            "-2" => "服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！",
//            "30" => "密码错误",
//            "40" => "账号不存在",
//            "41" => "余额不足",
//            "42" => "帐户已过期",
//            "43" => "IP地址限制",
//            "50" => "内容含有敏感词",
//            "51" => "手机号码格式不正确"
//        );
//
//        $code = rand(100000,999999);
//
//        session(array('name'=>'code','expire'=>600));
//        session('code',$code);  //设置session
//        session('num',session('num')+1);  //设置session
//        session('time',time());
//        dump($code);
//
//
//
//        $smsapi = "http://api.smsbao.com/";
//        $user = "gcan"; //短信平台帐号
//        $pass = md5($this->config['CODE_USER_PASS']); //短信平台密码
//        $content="[Tcash] 您好，您的验证码是".$code;//要发送的短信内容
//        $phone = "1780109891";//要发送短信的手机号码
//        $sendurl = $smsapi."sms?u=".$user."&p=".$pass."&m=".$phone."&c=".urlencode($content);
//        $result =file_get_contents($sendurl) ;
//
//        dump($result);
//        echo $statusStr[$result];
//
//        dump($_SESSION);




    }










}